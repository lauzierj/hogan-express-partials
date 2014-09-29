hogan-express-partials
======================

Express middleware for adding path-based partials support to hogan-express.

### Install

Install hogan-express-partials using [npm][4]:

`npm install hogan-express-partials`

### Usage

#### Setup
To use hogan-express-partials

```js
var partials = require('hogan-express-partials');

app.set('views', path.join(settings.path, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layouts/default');
app.engine('html', require('hogan-express'));

app.use(partials.middleware());
```

#### Using a path-based partial
In a layout or partial, you can include views-relative paths to other partials.

```js
app.get '/', (req,res)->
  res.locals = name: 'Jacob'
  res.render 'template'
```

If `layout.html` contained:

```html
<p>
  <strong>Message Layout</strong>
  {{{ yield }}}
</p>
```

and `template.html` contained:

```html
<em>{{ name }} says {{> @components/message }}</em>
```

and `message.html` or `message/index.html` was located in the `components` folder under `views` and it contained

```html
Hello World.
```

the callback would produce

```html
<p>
  <strong>Message Layout</strong>
  <em>Jacob says Hello World.</em>
</p>
```

See [hogan-express](https://github.com/vol4ok/hogan-express) for more documentation.