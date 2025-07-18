-- SQL to create Scores table in Azure SQL
CREATE TABLE Scores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Player NVARCHAR(100) NOT NULL,
    Score INT NOT NULL
);
