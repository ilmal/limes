package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	database "github.com/ilmal/cine-mate/server/db"

	server "github.com/ilmal/cine-mate/server"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	database.InitDB()

	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./dist", true)))
	r.Static("/public", "./public")

	api := r.Group("/api")
	server.InitRoutes(api)

	r.Run(fmt.Sprintf(":%d", 5001))
}
