var fadeInStart = 200;
var fadeOutStart = 150;
var fadeInEnd = 175;
var fadeOutEnd = 50;

var slideNavigator={
    steps: [],
    index: 0,
 
    init:function(){
        var realSteps = $('.real-step');
        $('.real-step').each(function(index, el) {
            slideNavigator.steps.push(el.id);
        });
        slideNavigator.index = Math.max(0, slideNavigator.steps.indexOf(document.location.hash.replace('#/','')));
        slideNavigator.overrideNavigation();
    },

    updateBackground: function() {
        var progress = slideNavigator.index / slideNavigator.steps.length;
        var fadeIn = Math.round((fadeInEnd - fadeInStart) * progress + fadeInStart);
        var fadeOut = Math.round((fadeOutEnd - fadeOutStart) * progress + fadeOutStart);
        var update = '-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 1000, from(rgb(X, X, X)), to(rgb(Y, Y, Y)))'.replace(/X/g, fadeIn).replace(/Y/g, fadeOut);
        console.log(update);

        $('body').css({
            background: update
        });
    },

    moveToNext:function() {
            slideNavigator.index++;
            if(slideNavigator.index >= slideNavigator.steps.length) slideNavigator.index = 0;
            document.location.href = '#/' + slideNavigator.steps[slideNavigator.index];
            slideNavigator.updateBackground();
    },
 
    moveToPrevious:function(){
            slideNavigator.index--;
            if(slideNavigator.index < 0) {
                slideNavigator.index = slideNavigator.steps.length-1;
            }
            document.location.href = '#/' + slideNavigator.steps[slideNavigator.index];
            slideNavigator.updateBackground();
    },
    overrideNavigation: function () {
        $(document).keyup(function(e) {
            if(e.which == 39 || e.which == 32) {
                e.preventDefault();
                slideNavigator.moveToNext();
            }
 
            if(e.which == 8 || e.which == 37 ) {
                e.preventDefault();
                slideNavigator.moveToPrevious();
            }
        });
    }
}
