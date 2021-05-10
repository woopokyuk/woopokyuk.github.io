/**
 * @author qcmoke
 * @description "mac面板"和"代码全选复制"
 * @Dependencies https://github.com/zenorocha/clipboard.js
 * @version 2.0
 */

 function initMacPanel() {
    var highlights = $(".highlight").not(".gist .highlight");
    for (var i = 0; i < highlights.length; i++) {
      var figure = $(highlights[i]);
      var css = figure.attr("class");
      var patt = /highlight(\s?)([a-zA-Z]*)/;
      patt.test(css);
      //得到第二个小括号的内容，如果为空，则设置为plain
      var language = RegExp.$2 || "plain";
      var newDiv = $("<div>")
        .attr("data-rel", language.toUpperCase())
        .addClass("highlight-wrap");
      var wrap = figure.wrap(newDiv);
      wrap.before(
        '<button class="copy-btn" data-clipboard-snippet=""><i class="fa fa-clipboard"></i></button>'
      );
    }
  }
  
  function initClipboard() {
    var clipboard = new ClipboardJS(".copy-btn", {
      target: function(trigger) {
        //return trigger.nextElementSibling;//返回复制按钮下一个列表选项的 HTML 内容
        ///返回复制按钮所在dom下含有class为code的第一个dom对象(可以防止复制figcaption的内容)
        var wrap = trigger.parentElement;
        var code = wrap.querySelector(".code");
        return code;
      }
    });
    clipboard.on("success", function(e) {
      var button = e.trigger;
      var iElement = button.querySelector("i");
      iElement.className = "fa fa-check";
      button.onmouseleave = function(ev) {
        e.clearSelection();
        setTimeout(function() {
          iElement.className = "fa fa-clipboard";
        }, 1000);
      };
    });
  }
  
  $(document).ready(function() {
    initMacPanel();
    initClipboard();
  });