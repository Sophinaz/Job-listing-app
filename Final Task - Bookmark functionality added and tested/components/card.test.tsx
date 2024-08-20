import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useCreateBookmarkMutation } from "../app/service/getApi";
import configureStore from "redux-mock-store";
import Card from "./Card";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

const mockStore: any = configureStore([]);

// Mock useSession, useDispatch, and useSelector
jest.mock("next-auth/react");
jest.mock("react-redux");
jest.mock("../app/service/getApi", () => ({
  useCreateBookmarkMutation: jest.fn(),
}));

describe("Card Component", () => {
  const mockDispatch = jest.fn();
  const mockCreateBookmark = jest.fn();

  let store: any;
  beforeAll(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue(true);
    (useSession as jest.Mock).mockReturnValue({ data: null });
    store = mockStore();
  });

  afterEach(() => {
    mockDispatch.mockClear();
    mockCreateBookmark.mockClear();
  });

  //   Testing if the card component renders with given dummy data props
  it("should render the component with given props", () => {
    (useCreateBookmarkMutation as jest.Mock).mockReturnValue([
      mockCreateBookmark,
      { isError: false, isLoading: false, isSuccess: true },
    ]);
    render(
      <Card
        title="Test Title"
        company="Test Company"
        location={["Location1"]}
        description="Test Description"
        categories={["Category1", "Category2"]}
        opType="Full-time"
        id="1"
        image="test.png"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Location1")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Category1")).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });

  //   Testing if the description is truncated when it reaches max length
  it("should truncate the description if it exceeds the max length", () => {
    (useCreateBookmarkMutation as jest.Mock).mockReturnValue([
      mockCreateBookmark,
      { isError: false, isLoading: false, isSuccess: true },
    ]);
    const longDescription = "A".repeat(305);
    render(
      <Card
        company="ABC"
        location={["A"]}
        description={longDescription}
        categories={["a"]}
        opType="imperson"
        title="Test Title"
        id="1"
        image="test.png"
      />
    );

    expect(
      screen.getByText(longDescription.substring(0, 304))
    ).toBeInTheDocument();
  });

  //   Testing the toggle property of the bookmark icon
  it("should toggle bookmark state when clicked", async () => {
    (useCreateBookmarkMutation as jest.Mock).mockReturnValue([
      mockCreateBookmark,
      { isError: false, isLoading: false, isSuccess: true },
    ]);
    render(
      <Card
        company="ABC"
        location={["A"]}
        description="helloo"
        categories={["a"]}
        opType="imperson"
        title="Test Title"
        id="1"
        image="test.png"
      />
    );
    const bookmarkButton = screen.getByAltText("kr");
    fireEvent.click(bookmarkButton);
    expect(screen.queryByAltText("kl")).toBeInTheDocument();
  });

  //   Testing if the create bookmark hook is called
  it("should call createBookmark when bookmark is clicked", async () => {
    (useCreateBookmarkMutation as jest.Mock).mockReturnValue([
      mockCreateBookmark,
      { isError: false, isLoading: false, isSuccess: true },
    ]);

    render(
      <Card
        company="ABC"
        location={["A"]}
        description="helloo"
        categories={["a"]}
        opType="imperson"
        title="Test Title"
        id="1"
        image="test.png"
      />
    );
    const bookmarkButton = screen.getByAltText("kr");
    fireEvent.click(bookmarkButton);

    expect(mockCreateBookmark).toHaveBeenLastCalledWith({
      ids: "1",
      token: null,
    });
  });

  //   Testing the loading state
  it("should show loading state when it is loading", () => {
    (useCreateBookmarkMutation as jest.Mock).mockReturnValue([
      mockCreateBookmark,
      { isError: false, isLoading: true, isSuccess: false },
    ]);

    render(
      <Card
        company="ABC"
        location={["A"]}
        description="helloo"
        categories={["a"]}
        opType="imperson"
        title="Test Title"
        id="1"
        image="test.png"
      />
    );

    const checkloading = screen.getByText(/Loading/);
    expect(checkloading).toBeInTheDocument();
  });
});
