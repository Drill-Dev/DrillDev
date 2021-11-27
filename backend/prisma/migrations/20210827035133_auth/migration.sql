-- CreateTable
CREATE TABLE "RefreshToken" (
    "accountId" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken.token_unique" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
