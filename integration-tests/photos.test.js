/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import { setupPhotoForm } from "./photos.js";

describe("Photos Application", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./photos.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    setupPhotoForm();
  });

  test("should insert a new photo card when the form is submitted", async () => {
    const urlInput = screen.getByLabelText(/url/i);
    const captionInput = screen.getByLabelText(/caption/i);
    const submitButton = screen.getByRole("button", { name: /add photo/i });

    await userEvent.type(urlInput, "https://picsum.photos/200/300");
    await userEvent.type(captionInput, "Lorem Picsum");
    await userEvent.click(submitButton);

    const addedPhoto = screen.getByRole("img", { name: "Lorem Picsum" });
    expect(addedPhoto).toBeVisible();
    expect(addedPhoto).toHaveAttribute("src", "https://picsum.photos/200/300");
    expect(addedPhoto).toHaveAttribute("alt", "Lorem Picsum");

    const caption = screen.getByText("Lorem Picsum");
    expect(caption).toBeVisible();
  });

  test("should clear form fields after successful submission", async () => {
    const urlInput = screen.getByLabelText(/url/i);
    const captionInput = screen.getByLabelText(/caption/i);
    const submitButton = screen.getByRole("button", { name: /add photo/i });

    await userEvent.type(urlInput, "https://picsum.photos/200/300");
    await userEvent.type(captionInput, "Lorem Picsum");
    await userEvent.click(submitButton);

    expect(urlInput).toHaveDisplayValue("");
    expect(captionInput).toHaveDisplayValue("");
  });

  test("should not add photo card or clear form when missing url", async () => {
    const captionInput = screen.getByLabelText(/caption/i);
    const submitButton = screen.getByRole("button", { name: /add photo/i });
    const photoCardList = screen.getByRole("list");

    await userEvent.type(captionInput, "Lonely Caption :(");
    await userEvent.click(submitButton);

    expect(photoCardList).toBeEmptyDOMElement();
    expect(captionInput).toHaveDisplayValue("Lonely Caption :(");
  });

  test("should not add photo card or clear form when missing caption", async () => {
    const urlInput = screen.getByLabelText(/url/i);
    const submitButton = screen.getByRole("button", { name: /add photo/i });

    await userEvent.type(urlInput, "https://picsum.photos/200/300");
    await userEvent.click(submitButton);

    const potentialImage = screen.queryByRole("img", {
      src: "https://picsum.photos/200/300",
    });
    expect(potentialImage).not.toBeInTheDocument();

    expect(urlInput).toHaveDisplayValue("https://picsum.photos/200/300");
  });

  test("should insert multiple photo cards when submitted sequentially", async () => {
    const urlInput = screen.getByLabelText(/url/i);
    const captionInput = screen.getByLabelText(/caption/i);
    const submitButton = screen.getByRole("button", { name: /add photo/i });
    const photoCardList = screen.getByRole("list");

    await userEvent.type(urlInput, "https://picsum.photos/200/300");
    await userEvent.type(captionInput, "Lorem Picsum 200x300");
    await userEvent.click(submitButton);

    await userEvent.type(urlInput, "https://picsum.photos/300/400");
    await userEvent.type(captionInput, "Lorem Picsum 300x400");
    await userEvent.click(submitButton);

    expect(photoCardList).toMatchSnapshot();
  });
});
