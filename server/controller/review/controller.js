import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// NOTE: BOT CODE: I FORGET REMINDING BOT THAT I HAD MIDDLEWARE CHECK ERROR !

const getReviewByProduct = async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ Message: "Product ID is required" });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: true, // Include user information in the review
      },
    });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ Message: "Failed to fetch reviews" });
  }
};

const createAReviewByUser = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.query;
  const { score, content } = req.body;
  console.log("create review ✅");

  if (!productId || !userId || !score) {
    return res
      .status(400)
      .json({ Message: "Product ID, User ID, and Score are required" });
  }

  try {
    const review = await prisma.review.create({
      data: {
        content: content,
        productId: productId,
        userId: userId,
        score: parseInt(score),
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ Message: "Failed to create review" });
  }
};

const updateAReviewByUser = async (req, res) => {
  const { productId } = req.query;
  const { userId } = req.query;
  const { score, content } = req.body;
  console.log("update review ✅ ");
  if (!productId || !userId || !score) {
    return res
      .status(400)
      .json({ Message: "Product ID, User ID, and Score are required" });
  }

  try {
    const review = await prisma.review.update({
      where: {
        productId_userId: {
          productId: productId,
          userId: userId,
        },
      },
      data: {
        content: content,
        score: parseInt(score),
      },
    });

    return res.status(200).json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ Message: "Failed to update review" });
  }
};

const deleteAReviewByUser = async (req, res) => {
  const { productId } = req.query;
  const { userId } = req.query;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ Message: "Product ID and User ID are required" });
  }

  try {
    await prisma.review.delete({
      where: {
        productId_userId: {
          productId: productId,
          userId: userId,
        },
      },
    });

    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ Message: "Failed to delete review" });
  }
};

export {
  getReviewByProduct,
  createAReviewByUser,
  updateAReviewByUser,
  deleteAReviewByUser,
};
