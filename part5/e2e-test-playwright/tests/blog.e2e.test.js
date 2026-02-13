const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "berner_kyle",
        password: "dontTakeMyQueen",
        name: "Kyle Berner",
      },
    });
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "king_n_queen",
        password: "dontPawnMe",
        name: "David",
      },
    });
    await page.goto("/");
  });

  test("login form is shown", async ({ page }) => {
    const usernameElement = page.getByLabel("username");
    const pwdElement = page.getByLabel("password");
    await expect(usernameElement).toBeVisible();
    await expect(pwdElement).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "berner_kyle", "dontTakeMyQueen");
      await expect(page.getByText("Kyle Berner logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("berner_kyle");
      await page.getByLabel("password").fill("wrongPwd");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Kyle Berner logged in")).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "logout" }),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "berner_kyle", "dontTakeMyQueen");
      await page.reload();
      await page.getByRole("button", { name: "logout" }).waitFor();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Checkmate Again",
        "Your Mate",
        "https://www.chess.com",
      );

      await expect(
        page.getByText("CheckMate Again by Your Mate").first(),
      ).toBeVisible();
    });

    describe("when blog list is available", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Checkmate Again",
          "Your Mate",
          "https://www.chess.com",
        );
      });
      test("like counter works", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("likes 0")).toBeVisible();

        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("remove button deletes blog", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "remove" }).waitFor();
        page.once("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();
        await expect(
          page.getByRole("button", { name: "view" }),
        ).not.toBeVisible();
      });
    });
  });

  describe("multiple blog posts added by different users", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "berner_kyle", "dontTakeMyQueen");
      await page.reload();
      await page.getByRole("button", { name: "logout" }).waitFor();

      await createBlog(
        page,
        "Checkmate Again",
        "Your Mate",
        "https://www.chess.com",
      );

      await page.getByRole("button", { name: "logout" }).click();

      await loginWith(page, "king_n_queen", "dontPawnMe");
      await page.reload();
      await page.getByRole("button", { name: "logout" }).waitFor();

      await createBlog(
        page,
        "David's Blog and Post",
        "Origato",
        "https://www.finale.com",
      );

      await page.getByText("Checkmate Again by Your Mate").first().waitFor();
      await page
        .getByText("David's Blog and Post by Origato")
        .first()
        .waitFor();
    });

    test("only user can see remove button on their blogs", async ({ page }) => {
      const checkmateBlog = page
        .locator("div")
        .filter({ hasText: "Checkmate Again by Your Mate" });
      await checkmateBlog.getByRole("button", { name: "view" }).first().click();

      await expect(
        checkmateBlog.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();

      const davidsBlog = page
        .locator("div")
        .filter({ hasText: "David's Blog and Post by Origato" });

      await davidsBlog.getByRole("button", { name: "view" }).first().click();

      await expect(
        davidsBlog.getByRole("button", { name: "remove" }),
      ).toBeVisible();
    });
  });
});
