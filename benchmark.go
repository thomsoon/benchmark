package main
import (
  "strconv"
  "time"
  "github.com/gin-gonic/gin"
  "github.com/gin-contrib/static"
  "github.com/gin-gonic/gin/binding"
)

func main() {
  router := gin.Default()

  router.GET("/salt", func(c *gin.Context) {
//todo: generate random salt
	//salt := make([]byte, 16)
	c.JSON(200, gin.H{"salt": "test_salt"})
  })

  var recive_time[] int64
  var prev_time int64
  router.POST("/nonce",func(c *gin.Context){
	var json map[string]interface{}
	if err := c.ShouldBindBodyWith(&json, binding.JSON); err != nil {
		c.JSON(400, gin.H{"Error": "JSON error 1"})
		return
	}
	if nonce, ok := json["nonce"]; !ok || nonce == "" || nonce == nil {
		c.JSON(200, gin.H{"Error": "no \"nonce\""})
		return
	}
	now := time.Now().UnixNano()
	elapsed_time := (now-prev_time)/1000
	recive_time = append(recive_time, now)
	c.JSON(200, gin.H{"elapsed_time": strconv.FormatInt(elapsed_time, 10)+" micro sec"})
	prev_time = now
	//todo: nonce check
  })

  router.GET("/average", func(c *gin.Context) {
	l := int64(len(recive_time))
    average := (recive_time[l-1]- recive_time[1])/l
	c.JSON(200, gin.H{"average": average})
  })

  router.GET("/recieve_times", func(c *gin.Context){
	  c.JSON(200, recive_time)
  })

  router.GET("/delete", func(c *gin.Context){
	recive_time = nil
	c.Status(200)
  })

  router.Use(static.Serve("/", static.LocalFile("static", false)))
  router.Run(":8080")
}