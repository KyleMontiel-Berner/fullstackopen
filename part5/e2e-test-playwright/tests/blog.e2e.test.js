const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "berner_kyle",
        password: "dontTakeMyQueen",
        name: "Kyle Berner",
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

  test("user can login", async ({ page }) => {
    await loginWith(page, "berner_kyle", "dontTakeMyQueen");
    await expect(page.getByText("Kyle Berner logged in")).toBeVisible();
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
        "https://chess.com",
      );

      await expect(
        page.getByText("CheckMate Again by Your Mate").first(),
      ).toBeVisible();
    });
  });
});
