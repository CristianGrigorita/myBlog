$(document).ready(init);


function init(){
    console.log("app js loaded!");
    checkRole();
    subscribeToEvents();
    
    $(function(){
        $("#header").load("ui/assets/layout/navbar.html");
        console.log('Nav bar loaded');
        $("#footer").load("ui/assets/layout/footer.html");
    });
    
    function subscribeToEvents(){
        
        //for modal menus
        $('.modal').modal();
        $('ul.tabs').tabs();
        
        //subscribe to search
        $('#header').on("keypress", '#search', function(e){
            if(e.which == 13){//Enter key pressed
                console.log("enter pressed on search");
                getSearchArticle();
            }
        });
        
        $('.signUpButton').on("click", function() {
            signUp();
        });
        $('.logInButton').on("click", function() {
            logIn();
            $(".modal").modal('close');
        });
        $('#contactSubmitBtn').on("click", function() {
            contactMessage();
        });
        
        // make sure header is fully loaded and then subscribe to log out button.
        $("#header").on("click", "#logOutBtn", function(){
            console.log("log out pressed!");
            logOut(event);  
        });
    }

        //SUBSCRIBE TO DROPDOWN MENU. Added in navbar.html, as script, for faster load.
        // $('#header').on("click", "#accountBox", function() {
        //     $("#accountBox").dropdown();
        //     console.log("clicked");
        // });
        // }
    
    
    function articleAction(){
        $('.articleClick').click(function() {
            var articleId = $(this).attr('articleId');
            getOne(articleId);
        });
        
        $('.articleDeleteBtn').on("click", function(){
            var articleId = $(this).attr('articleId');
            deleteArticle(articleId);
        });
        $('.createArticleBtn').on("click", function(){
            ArticlesUiModule.displayCreateForm();
            $('#createArticleSubmit').on("click", function(){
                console.log("create article!");
                createArticle();
            });
        });
        $('.articleEditBtn').on("click", function(){
            var articleId = $(this).attr('articleId');
            getEditArticle(articleId);
        });
    }
 
    
    function setSearchData(){
        var searchInput = $("#search").val();
        console.log("search this:", searchInput);
        
        return {
            search : searchInput,
        };
    }
    
    function getSearchArticle(){
        console.log("on search ajax!");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/articles/search",
            data: setSearchData(),
            success: function(result){
                result= result.data;
                ArticlesUiModule.displayArticles(result, role);
                console.log(result);
            },
            error: function(XHR, textStatus, error) {
                console.log("error in search", error);
            },
            complete: function(XHR, status){},
        });
    }
    
    function logOut(event){
        event.preventDefault();
        console.log("log out function");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/accounts/logOut",
            data:{
                
            },
            success: function(result) {
                console.log(result);
                checkRole();
            },
            error: function(XHR, textStatus, error) {
                console.log('error loging out', error);
            },
            complete: function (XHR, status) {},
        });
    }
    
    function getOne(id){
        $.ajax({
            method: 'POST',
            url: "https://blog-grigorita.c9users.io/api/articles/one",
            data: {
                id: id,
            },
            success: function(result){
                result = result.data;
                ArticlesUiModule.displayArticlePage(result);
                console.log("result id: ", result.id)
                getComments(result.id);
                console.log(result);
            },
            error: function(XHR, textStatus, error){
                console.log('error getting selected article', error);
            },
            complete: function(XHR, status){},
        });
    }
    
    function getComments(id){
        console.log("get comments ajax")
        $.ajax({
            method: 'POST',
            url: "https://blog-grigorita.c9users.io/api/comments",
            data: {
                article_id: id,
            },
            success: function(result){
                result = result.data;
                ArticlesUiModule.displayComments(result, result.id);
                console.log("here is result.data:", result);
                 $(document).on("click", ".addCommentBtn", function(){
                    console.log("on click, this is result.id: ", id);
                    addComment(id);
                });
            },
            error: function(XHR, textStatus, error){
                console.log('error getting comments for selected article', error);
            },
            complete: function(XHR, status){},
        });
    }
    
    function commentData(id){
        
        var title = $('#insertCommentTitle').val();
        var content = $('#contentEdit').val();
        var id = id;
        
        return {
            article_id: id,
            title: title,
            comment: content,
        }
    }
    
    function addComment(id){
        console.log("in add comment ajx")
        $.ajax({
        method: 'POST',
        url: "https://blog-grigorita.c9users.io/api/comments/add",
        data: commentData(id),
        success: function(result){
            console.log("succesfully added comment: ", result);
            result = result.data;
        },
        error: function(XHR, textStatus, error){
            console.log('error adding comments for selected article', error);
        },
        complete: function(XHR, status){},
        });
    }
    
    function getArticles(role) {
        console.log("am intrat in getArticles, ajax");
        $.ajax({
            method: "GET",
            url: "https://blog-grigorita.c9users.io/api/articles",
            success: function(result) {
                console.log (result);
                result = result.data;
                ArticlesUiModule.displayArticles(result, role);
                articleAction();
            },
            error: function(XHR, textStatus, error) {
                console.log('error while getting articles', error);
            },
             complete: function (XHR, status) {},
        });
    }
    
    function checkRole (){
        console.log("check role ajax");
        $.ajax({
            method: "GET",
            url: "https://blog-grigorita.c9users.io/api/accounts/role",
            success: function(result){
                role = result.data;
                getArticles(role);
                // ArticlesUiModule.displayAdminButtons(result);
                // console.log(result);
            },
            error: function(XHR, textStatus, error){
                console.log("error while checking role", error);
            },
            complete: function (XHR, status) {},
        });
    }
    
    function setSingUpInfo(){
        var first_name = $('#first_name').val();
        var last_name  = $('#last_name').val();
        var email = $('#userEmail').val();
        var password = $('#pass').val();
        var confirmPass = $('#passwordConfirm').val();
        
        if (password !== confirmPass){
            console.log("password not matched! Pass: ", password, " Confirm: ", confirmPass);
            return "password not matched!";
        } else {
            console.log("Data sent trough ajax: ", first_name, last_name, email, "hidden pass :D");
            return {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            };
        }
    }
    
    function signUp(){
        console.log("sign up function");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/accounts/signUp",
            data: setSingUpInfo(),
            success: function(result) {
                console.log(result);  
            },
            error: function(XHR, textStatus, error) {
                console.log('error sign-up ', error);
            },
            complete: function (XHR, status) {},
        });
    }
    
    function setLogInInfo(){
        var email  = $("#logInEmail").val();
        var password = $("#logInPassword").val();
        return {
            email: email,
            password: password,
        };
    }
    
    function logIn(){
        console.log("log in function");
            $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/accounts/logIn",
            data: setLogInInfo(),
            success: function(result) {
                console.log("this is the succes result: ", result);
                checkRole();
                 $('#modal').modal('close');
            },
            error: function(XHR, textStatus, error) {
                console.log('error loging in ', error);
            },
            complete: function (XHR, status) {},
        });
    }
    
    function setContactInfo(){
        var email = $('#contactEmail').val();
        var first_name = $('#contact_first_name').val();
        var last_name = $('#contact_last_name').val();
        var subject =  $('#contactSubject').val();
        var content =  $('#contactMessage').val();
        return {
            email : email,
            first_name: first_name,
            last_name: last_name,
            subject: subject,
            message: content,
        };
    }
    
    function contactMessage(){
        console.log("contact info");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/contact",
            data: setContactInfo(),
            success: function(result){
                console.log("success in sending message trough contact: ", result);  
            },
            error: function(XHR, textStatus, error) {
                console.log('error sending message to contact ', error);
            },
            complete: function (XHR, status){},
        });
    }
    
    function createArticleData(){
        if($('#articlePublish').prop('checked')) {
            var published = 1;
        } else {
            published = 0;
        }
        var title = $('#createArticleTitle').val();
        var content = $('#createArticleContent').val();
        var artImage = $('#createArticleFile');
        var image = artImage[0].files[0];
        
        var data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('published', published);
        data.append('image', image);
        
        console.log("publish: ", published, " title: ", title, ". content: ", content, ". imageFile: ", artImage, ". image: " , image);
        return data;
    }
    
    function createArticle(){
        console.log("create new article");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/articles/create",
            data: createArticleData(),
            processData: false,
            contentType: false,
            success: function (result){
                result = result.data;
                console.log("result is: ", result);
                console.log("Successfully created added article: ", result);
            },
            error: function(XHR, textStatus, error){
                console.log('error, could not create article', error);
            },
            complete: function (XHR, status){},
        });
    }
    
    function editArticleData(articleId, defaultImage){
        var title = $('#editArticleTitle').val();
        var content = $('#contentEdit').val();
        var artImage = $('#editImageInput');
        var id = articleId;
        var image = artImage[0].files[0];
        var defaultImage = defaultImage;
        
        var data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('image', image);
        data.append('id', id);
        data.append('defaultImage', defaultImage);
        
        console.log("id: ", id, "title: ", title, " content: ", content, ". imageFile: ", artImage, ". image: " , image, " defaultImage: ", defaultImage);
        return data;
    }
    
    function editArticle(articleId, defaultImage){
        console.log("edit article");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/articles/edit",
            data: editArticleData(articleId, defaultImage),
            processData: false,
            contentType: false,
            success: function (result){
                result = result.data;
                console.log("result is: ", result);
                console.log("Successfully created added article: ", result);
            },
            error: function(XHR, textStatus, error){
                console.log('error, could not create article', error);
            },
            complete: function (XHR, status){},
        });
    }
    
    function deleteArticle(id){
        console.log("delete article");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/articles/delete",
            data: {
                id: id,
            },
            success: function (result){
                console.log("Successfully deleted article number: ", result);
            },
            error: function(XHR, textStatus, error){
                console.log('error, could not delete article', error);
            },
            complete: function (XHR, status){},
        });
    }
    
    function getEditArticle(id){
        console.log("edit article page");
        $.ajax({
            method: "POST",
            url: "https://blog-grigorita.c9users.io/api/articles/one",
            data: {
                id: id,
            },
            success: function (result){
                console.log("Successfully got article to edit", result.data);
                result = result.data;
                ArticlesUiModule.displayEditPage(result);
                $('.saveEdit').on("click", function(){
                    console.log("on click, this is result.id: ", result.id);
                    editArticle(result.id, result.image);
                });
            },
            error: function(XHR, textStatus, error){
                console.log('error, could not get to edit article', error);
            },
            complete: function (XHR, status){},
        });
    }
    
}