-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "accountId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
