const express = require("express")
const posts = require("../data/db")

const router = express.Router()


router.get("/", (req, res) => {
	posts.find()
		.then((post) => {
			res.status(200).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
		})
})

router.get("/:id", (req, res) => {
	posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "Post not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
		})
})

router.post("/", (req, res) => {
    console.log(req.body)
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing post title or post content",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding post",
			})
		})
})

router.put("/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing title or content",
		})
	}

	posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating post",
			})
		})
})

router.delete("/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the post",
			})
		})
})

router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
    .then((comments) => {
        res.status(200).json(comments)
    })
    .catch((error) => {
        res.status(500).json({
            message: "Error finding post comments"
        })
    })
})

router.get("/:id/comments/:commentId", (req, res) => {
    posts.findCommentById(req.params.commentId)
    .then((comment) => {
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({
                message: "Comment not found"
            })
        }
    })
    .catch((error) => {
        res.status(500).json({
            message: "Comment by ID was not found"
        })
    })
})

router.post("/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            message: "Add content"
        })
    }
    console.log(req.body)

    posts.insertComment(req.body)
    .then((comment) => {
        res.status(200).json(comment)
    })
    .catch((error) => {
        res.status(500).json({
            message: "Error creating message"
        })
    })
})



module.exports = router