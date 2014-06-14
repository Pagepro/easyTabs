#easyTabs


###Benefits
* You can allow easly manage tabs on your website.
* You can run JS calback after tab chane .

##Installation

###Step 1: Link plugin file

```html
<script src="/js/jquery.easytabs.js"></script>
```

###Step 2: Call the easyMap


```javascript
$(document).ready(function(){
  $('.tabs-playlists').easyTabs();
});
```

##Configuration options


**nav**
jQuery seleftor for tabs navigation element.
```
default: '.tabs-nav'
options: string
```

**content**
jQuery seleftor for tabs content container.
```
default: 'tabs-content'
options: string
```

**navActive**
Tab navigation active element class name.
```
default: 'active'
options: string
```

**tabActive**
Tab active element class name.
```
default: 'tab-active'
options: string
```

**afterChange**
Callback after tab is changed.
```
default: function () {}
options: function
```


##Examples

Basic confirguration.

```javascript
$(document).ready(function(){
  $('.tabs-playlists').easyTabs({
    nav: '.tabs-nav',
    content: '.tabs-content'
  });
});
```

Other basic confirguration.

```javascript
$(document).ready(function(){
  $('.tabs-playlists').easyTabs({
    nav: '> header',
    content: '> div'
  });
});
```

JavaScript callback.

```javascript
$(document).ready(function(){
  $('.tabs-playlists').easyTabs({
    afterChange: function () {
     alert('Tab was changed');
    }
  });
});
```