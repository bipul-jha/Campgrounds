var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Blog     =require("../models/blog");
var Todo    = require("../models/todo");

// all the middleare goes here
var middlewareObj = {};
middlewareObj.checkBlogOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundBlog.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}



middlewareObj.checkTodoOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Todo.findById(req.params.id, function(err, foundTodo){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundTodo.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","you dont have the permission");
                res.redirect("back");
            }
           }
        });
    } else {
        
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","login first!!");
    res.redirect("/login");
};

module.exports = middlewareObj;