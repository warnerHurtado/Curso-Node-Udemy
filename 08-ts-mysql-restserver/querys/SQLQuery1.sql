

CREATE DATABASE Node;
GO

USE Node
GO

CREATE TABLE Users (
	id    INT IDENTITY(1,1) NOT NULL,
	name   VARCHAR(50)      NOT NULL,
	email  VARCHAR(50)      NOT NULL,
	estado BIT DEFAULT(1)	NOT NULL
)

INSERT INTO Users(name, email, estado) VALUES ('Katherine Hurtado', 'kathi@gmail.com', 1);

select * from Users

ALTER TABLE Users ADD createdAt time default getdate()

ALTER TABLE Users DROP column createdAt time