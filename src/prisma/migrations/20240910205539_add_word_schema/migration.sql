-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "englishWord" TEXT NOT NULL,
    "foreignWord" TEXT NOT NULL,
    "englishExample" TEXT NOT NULL,
    "foreignExample" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "wordType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
