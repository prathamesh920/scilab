$(document).ready(function(){
  console.log("loaded")
  /*
   * Selectors function
   * Write the queries using .on()
  */


  $(".bookss").on("click",".mmbooks", function() {
    console.log("#books-wrapper"+this.id);
      ajax_loader(this);
      Dajaxice.website.chapters(function(data) {
          Dajax.process(data);
          ajax_loader("clear");
      }, {book_id: $(this).attr('id')});
  });


  $(".chapterss").on("click", '.chp', function(event) {

    console.log("#chapters-wrapper"+this.id)
      $("#examples-wrapper").html("");
      $("#download-chapter").show();
      ajax_loader(this);
      Dajaxice.website.examples(function(data) {
          Dajax.process(data);
          ajax_loader("clear");
      }, {chapter_id: $(this).attr('id')});
  });

  $(document).on("click", '.exmp', function() {
      ajax_loader(this);
      $("#download-example").show();
      $("#hidethis").hide();
      $('.exmpid').attr('id', this.id);
      Dajaxice.website.code(function(data) {
          editor.setValue(data.code);
          ajax_loader("clear");
      }, {example_id: $(this).attr('id')});
  });

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        lineWrapping: true,
        theme: "default",
        extraKeys: {
           "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
           },
           "Esc": function(cm) {
             console.log("running");
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
           }
         }
    });

    var result = CodeMirror.fromTextArea(document.getElementById("result"), {
        lineWrapping: true,
        theme: "default",
        extraKeys: {
           "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
           },
           "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
           }
         }
    });

    /* Code Mirror Controls */
    $fullscreen_code = $("#fullscreen-code");
    $toggle_code = $("#toggle-code");

    $fullscreen_code.click(function(e) {
        editor.setOption("fullScreen", !editor.getOption("fullScreen"));
        editor.focus();
        e.preventDefault();
    });

    $toggle_code.click(function(e) {
        if(editor.getOption("theme") == "monokai") {
            editor.setOption("theme", "default");
        } else{
            editor.setOption("theme", "monokai");
        }
        e.preventDefault();
    });

    $fullscreen_result = $("#fullscreen-result");
    $toggle_result = $("#toggle-result");

    $fullscreen_result.click(function(e) {
        result.setOption("fullScreen", !result.getOption("fullScreen"));
        result.focus();
        e.preventDefault();
    });

    $toggle_result.click(function(e) {
        if(result.getOption("theme") == "monokai") {
            result.setOption("theme", "default");
        } else{
            result.setOption("theme", "monokai");
        }
        e.preventDefault();
    });


    /* Execute the code */
    $plotbox_wrapper  = $("#plotbox-wrapper");
    $plotbox = $("#plotbox");
    $(document).on("click", "#execute", function() {
      console.log("running");
        $("#execute-inner").html("Executing...");
        Dajaxice.website.execute(function(data) {
            $("#execute-inner").html("Execute");
            result.setValue(data.output);
            if(data.plot_path) {
                $plot = $("<img>");
                $plot.attr({
                    src: data.plot_path,
                    width: 800
                });
                $plotbox.html($plot);
                $plotbox_wrapper.lightbox_me({centered: true});
            }
        }, {
            token: $("[name='csrfmiddlewaretoken']").val(),
            code: editor.getValue(),
            book_id: $(".bks_id").attr('id') || 0,
            chapter_id: $(".chp_id").attr('id') || 0,
            example_id: $(".ex_id").val() || 0
        });
    });
    /* Download book, chapter, example */
    $(document).on("click", "#download-book", function(e) {
        window.location = "http://scilab.in/download/book/" + $(this).attr('value');
        e.preventDefault();
    });

    $(document).on("click", "#download-chapter", function(e) {
        window.location = "http://scilab.in/download/chapter/" + $(".chp_id").attr('id');
        e.preventDefault();
    });

    $(document).on("click", ".exmpid", function(e) {
      if ($('.exmpid').attr('id')){
        window.location = "http://scilab.in/download/example/" + $('.exmpid').attr('id');
        e.preventDefault();
    }});

    /* Ajax loader */
    function ajax_loader(key) {
        if(key == "clear") {
            $(".ajax-loader").remove();
        } else {
            $(key).after("<span class='ajax-loader'></span>");
        }
    }

    /* Contributor details */
    $(document).on("click", "#contributor", function(e) {
        Dajaxice.website.contributor(function(data) {
            Dajax.process(data);
            $("#databox-wrapper").lightbox_me({centered: true});
        }, {book_id: $("#books").val()});
        e.preventDefault();
    });

    $(document).on("click", ".node", function(e){
        Dajaxice.website.node(function(data) {
            Dajax.process(data);
            $("#databox-wrapper").lightbox_me({centered: true});
        }, {key: $(this).data("key")});
        e.preventDefault();
    });


    /* Bug form handling */
    $(document).on("click", "#bug", function(e) {
        Dajaxice.website.bug_form(function(data){
            Dajax.process(data);
            $("#bug-form-wrapper").lightbox_me({centered: false});
        });
        e.preventDefault();
    });

    $(document).on("click", "#bug-form-submit", function(e){
        Dajaxice.website.bug_form_submit(Dajax.process, {form: $("#bug-form").serialize(true)});
        e.preventDefault();
    });

    $(document).on("click", "#bug-form #id_notify", function() {
        $("#id_email_wrapper").toggle(this.checked);
    });

});
