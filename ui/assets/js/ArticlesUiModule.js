var ArticlesUiModule = (function($){
    
    

    
    var getArticlesHtml = function(articles, role) {
        var artNum = $(articles).toArray().length;
        console.log("nr de articole", artNum);
        var html = '<div class="articlesContainer">';
        if (role == 'admin'){
            html += '<a class="waves-effect waves-light btn yellow darken-4 createArticleBtn">Create</a>';
        }
        $.each(articles, function(index, article){
            if(article.published == 0 && role != 'admin'){
            return true;
        }
        html += '<div class="row articleContainer">';
        html +=    '<div class="col s12 m6 offset-m2">';
        html += '<div class="card section scrollspy hoverable">';
        html +=     '<div class="card-image">';
        html +=         '<img class="articleClick" src="' + article.image + '" articleId=' + article.id + '>';
        html +=         '<span class="artTitle articleClick" articleId="' + article.id + '">' + article.title + '</br>';
        html +=             '<p class="ultra-small ">' + article.creation_date + '</p>';
        html +=             '<p class="ultra-small authorName"> ' + article.last_name + " " + article.first_name + '</p></span>';
if (role == "admin"){
        html +=             '<div class="fixed-action-btn hoverBtn">';
        html +=                 '<a class="btn-floating red">';
        html +=                 '<i class="large material-icons">add</i>';
        html +=                 '</a>';
        html +=                     '<ul>';
        html +=                         '<li><a class="btn-floating red adminBtn articleDeleteBtn" articleId="' +article.id+ '"><i class="material-icons">delete</i></a></li>';
        html +=                         '<li><a hidden class="btn-floating yellow darken-1 adminBtn articleEditBtn" articleId="' +article.id+ '"><i class="material-icons">edit</i></a></li>';
        // html +=                         '<li><a class="btn-floating green articleCommentBtn" articleId="' +article.id+ '"><i class="material-icons">comment</i></a></li>';
        html +=                     '</ul>';
        html +=             '</div>';
    }
        html +=     '</div>';
        html +=         '<div class="card-content">';
        html +=             '<p class="articleContent truncate">' + article.content + '</p>';
        html +=         '</div>';
        html +=     '</div>';
        html += '</div>';
        html += '</div>';
        });
        html += '</div>';
        
        return html;
    }

    var getOneHtml = function(article){
        var html = '<div class="row articlePage">';
        html +=    '<div class="col s12 m8 offset-m2">';
        html +=       '<div class="card">';
        html +=           '<div class="card-image">';
        html +=                '<img src="' + article.image + '">';
        html +=                '<span class="artTitle">' + article.title + '</br>';
        html +=                '<p class="ultra-small ">' + article.creation_date + '</p>';
        html +=                '<p class="ultra-small authorName"> ' + article.last_name + " " + article.first_name + '</p></span>';
        html +=            '</div>';
        html +=            '<div class="card-information">';
        html +=            '</div>';
        html +=            '<div class="card-content">';
        html +=                '<p class="justifyText">' + article.content + '</p>';
        html +=            '</div>';
        html +=        '</div>';
        html +=    '</div>';
        html += '</div>';
       
        return html;
    }
    
    var createForm = function(){
        var html = '';
        html += '<div class="row">' +
        '<form class="col s10 offset-s1">' +
            '<div class="row">' +
                '<div class="input-field col s4">' +
                    '<input id="createArticleTitle" type="text">'+
                    '<label for="createArticleTitle">Title</label>'+
                '</div>'+
                '<div class ="input-field col s2  offset-s2">'+
                    '<p>'+
                        '<input type="checkbox" id="articlePublish" />'+
                        '<label for="articlePublish">Publish</label>'+
                    '</p>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="input-field col s8">'+
                    '<textarea id="createArticleContent" class="materialize-textarea"></textarea>'+
                    '<label for="createArticleContent">Content</label>'+
                '</div>'+
            '</div>'+
            '<div class="file-field input-field col s8">'+
                '<div class="btn">'+
                    '<span>File</span>'+
                    '<input type="file" id="createArticleFile">'+
                '</div>'+
                '<div class="file-path-wrapper">'+
                    '<input class="file-path validate" type="text">'+
                '</div>'+
            '</div>' +
                '<div class="row">'+
            '<a class="waves-effect waves-light btn" id="createArticleSubmit">Submit</a>'+
        '</div>'+
        '</form>'+
      '</div>';
  
    return html;
    }
    
    var editPage = function(article){
        var html = '';
        html += '<div class="row articlePage"  articleId="' + article.id + '">' +
        '<a id="fixedbutton" class="waves-effect waves-light btn yellow darken-4 saveEdit">Save</a>'+
            '<div class="col s12 m8 offset-m2">' +
               '<div class="card">' +
                   '<div class="card-image">' +
                        '<img src="' + article.image + '">' +
                          '<div class="file-field input-field">'+
                              '<div class="btn">'+
                                '<span>File</span>'+
                                '<input type="file" id="editImageInput">'+
                              '</div>'+
                              '<div class="file-path-wrapper">'+
                                '<input class="file-path validate" type="text">'+
                              '</div>'+
                            '</div>' +
                         '<span class="artTitle"><input type="text" class="editArtTitle" id="editArticleTitle" name="editArtTitle" value="' + article.title + '"/> </br>' +
                         '<p class="ultra-small ">' + article.creation_date + '</p>' +
                         '<p class="ultra-small authorName"> ' + article.last_name + " " + article.first_name + '</p></span>' +
                     '</div>' +
                     '<div class="card-information">' +
                     '</div>' +
                     '<div class="card-content">' +
                         '<p class="justifyText"><textarea id="contentEdit" class="materialize-textarea"></textarea></p>' +
                     '</div>' +
                 '</div>' +
             '</div>' +
             '<div class="artComments" articleId="' + article.id + '"></div>'+
          '</div>'
       
        return html;
    }
    
    var renderCommHtml = function(comments){
        var html = '';
        if (role != 'guest'){
                    html += '<div class= "addComment">'+
                     '<div class="row">'+
                            '<div class="col s12 m6 offset-m4">'+
                                '<div class="card blue-grey lighten-2">'+
                                    '<div class="card-content white-text">'+
                                    '<span class="card-title commentTitle">'+
                                                   '<label for="insertCommentTitle" class= " white-text">Title:</label>'+
                                                    '<input id="insertCommentTitle" type="text" class="blue-grey lighten-3">'+
                                        '</span>'+
                                        '<div class="divider"></div>' +
                                        '<p class="justifyText"><textarea id="contentEdit" class="materialize-textarea blue-grey lighten-3"></textarea></p>' +
                                    '</div>'+
                                    '<a class="waves-effect waves-light btn right addCommentBtn">Submit</a>' +
                                '</div>'+
                                '</div>'+
                    '</div>'+
                    '</div>'   
        }
        '<div class= "commentsContainer">'
        $.each(comments, function(index, comment){
        html+= '<div class="row">'+
                '<div class="col s12 m6 offset-m2">'+
                    '<div class="card grey lighten-5">'+
                        '<div class="card-content black-text">'+
                            '<span class="card-title commentTitle">' + comment.title + '</br>' +
                            '<p class="ultra-smallComment authorName">'+ "author: " + comment.last_name + " " + comment.first_name + '</p>' +
                            '</span>'+
                            '<div class="divider"></div>' +
                            '<p class="commentText">' + comment.comment + '</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
        '</div>'
    })
    html += '</div>';
    
        return html;
    }
    
    return {
        displayArticles: function(articles, role) {
            console.log("role got in display: ", role);
            $('.content').html(getArticlesHtml(articles,role));
        },
        displayArticlePage: function(article){
            $('.content').html(getOneHtml(article));
        },
        displayCreateForm: function(){
            $('.content').html(createForm());
        },
        displayEditPage: function(article){
            $('.content').html(editPage(article));
            $('#contentEdit').val(article.content);
            $('#contentEdit').trigger('autoresize');
        },
        displayComments: function(comments){
            $('.artComments').html(renderCommHtml(comments));
        }
    }
})($);



        
//          var articles_per_page = 2;

//     var previousPage = function(current_page, articles){
//         if (current_page > 1) {
//             current_page--;
//             changePage(current_page, articles);
//         }
//     }

//     var nextPage = function(current_page, articles){
//         if (current_page < numPages(articles)) {
//             current_page++;
//             changePage(current_page, articles);
//         }
//     }

//     var changePage = function (page, articles){
        
//         var btn_next = $(".btn_next");
//         var btn_prev = $(".btn_prev");
//         var listing_table = $(".listingTable");
//         var page_span = $(".page");
     
//         // Validate page
//         if (page < 1) page = 1;
//         if (page > numPages(articles)) page = numPages(articles);
    
//         listing_table.html = "";
    
//         for (var i = (page-1) * articles_per_page; i < (page * articles_per_page); i++) {
//             listing_table.html += articles[i].title + "<br>";
//         }
//         page_span.html = page;
    
//         if (page == 1) {
//             btn_prev.style.visibility = "hidden";
//         } else {
//             btn_prev.style.visibility = "visible";
//         }
    
//         if (page == numPages(articles)) {
//             btn_next.style.visibility = "hidden";
//         } else {
//             btn_next.style.visibility = "visible";
//         }
//     }
    
//     var numPages = function (articles) {
//         var artNum = $(articles).toArray().length;
        
//         return Math.ceil(artNum / articles_per_page);
//     }

//     window.onload = function() {
//     changePage(1);
// };

    
//     var pagination = function (articles){
//         var current_page = 1;
//         previousPage(current_page, articles);
//         nextPage(current_page, articles);
        
        
//     }