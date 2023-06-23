# HTML Boilerplate

## Setup

### Prerequisites

You will need [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) set up to manage your Node version, or alternatively be using the version of Node that is contained in the .nvmrc file.

### Starting a new project

Clone this repo, `cd` into the folder, run `nvm use` to switch to the proper node version for this project, and run `npm install`.

## Commands

`npm run dev` will spin up a localhost serving your pages from system memory. This means your files do not compile when you run this. Hot Module Replacement is set up by default, so development should be super fast.

`npm run build` will build your files for production. All of the minification, image compression, and compilation happens here. Your files will be output into the `/dist/` folder, which is the folder you should point Netlify to if you are pushing it up there, or this is the folder you should copy to a client's server if you are making it live somewhere else.

`npm run preview` this will load up your compiled files into the browser so you can see what has been compiled.

## How it works

This boilerplate utilises Vite as a bundler. Rollup plugins can be used out of the box in Vite, so some of these are used as part of the build process - specifically to generate our responsive images.

The input file for the bundler is the src/index.html file (and any others you reference in the vite.config.js). This file has a the main.js file loaded, but notice there are no css files referenced in our input file.

Any of the pages you wish to include in the project should go inside the `/src/` folder inside a subfolder named with the page slug. We have a few example pages in there under `/free-ebook/` `/questionnaire/` and `/thank-you/`. Make sure to include the trailing slash in your urls when you are developing. These pages have basic layouts that utilise Bootstrap. Please remove any of these pages that are not in use from your final file.

Check out the features below for some info on how to embed inline SVGs, how to structure your image paths, and add new pages to your project.

## Features

### Lean Bootstrap

We have removed some of the Bootstrap classes that we find we do not use often. For this reason you may find there are some classes that do not work.

### Automatic inline SVGs

Place your SVGs in the src/images folder, and reference your svg files like this `<icon src="FILENAME.svg"></icon>`. <ins>You don't need to reference the folder before your filename as this gets added by postHTML.</ins> If you want to load your SVG like an image, you can just reference it as you would an image with an `<img>` tag. To load an SVG via an `<img>` tag, the SVG must be added to the /src/public folder eg. `<img src="svg-img.svg"/>`

### Automatic image processing

Place your images in the src/images folder, and reference your image files like this `<img src="FILENAME.png" />`. <ins>You don't need to reference the folder before your filename as this gets added by postHTML.</ins> There is some additional HTML added in postHTML, wrapping the `<img>` in `<picture>` tags- this is done so that we can serve .webp's to all browsers.

To disable lazyloading for a specific image, add the attribute 'nolazy'- eg. `<img src="FILENAME.png" nolazy/>`

### Adding new pages

In the vite.config.js file update the build.rollupOptions.input to include your additional HTML files. This will allow Vite to parse these in addition to the defaults. Additional pages can be accessed using a trailing `/`- so if you add `/thank-you`, in the browser it must be accessed via `localhost:3000/thank-you/`.

### Templated Sections

Navigating to /sections/ will display the templated sections page. These sections are pre-built modules that may assist in building some commonly seen design elements.

### Thank You Message

This is a popup that only shows once the user submits an eBook form. For this popup to show, there are 4 requirements.

-   The form being submitted must have the class: 'kk-showthankyou'
-   The HTML for the popup must be present on the home page, find it [here](https://github.com/kingkongdevs/boilerplate/blob/master/src/index.html#L62)
-   The JS function must be included in main.js, [here](https://github.com/kingkongdevs/boilerplate/blob/master/src/index.js#L8)
-   The King Kong tracker.min.js validation script must be included on the form's page

By default, everything above will be completed for you except for the tracking script, you can uncomment this when the project goes live.

To test the modal window without submitting a form, go to the root page and add the following query string to your url: `?kk_preview_ty=1`.

### Form Validation

Add the class `kk-validation` to the form, and un-comment/add the lead library script to the bottom of the page `https://scripts.kingkong.net.au/tracker.min.js`.

Validation will work automatically assuming the correct `type` is set on each field, i.e. `text` for name, `email` for email addresses, `tel` for phone numbers.

Be sure to **NOT** include the large activecampaign script for validation, as this will interfere with the lead library and tracking.

With forms other than ActiveCampaign or Infusionsoft, this process will not apply.

### Custom Recapcha V3 For Forms
Add your own recaptcha v3 to our forms. The form must be using our custom validation, so the `kk-validation` class must be applied to the form. Here's how to set it up:
- Add `kk-recaptcha` class to the form.
- Create a new site/secret key pair in google's recaptcha console (inside the accounts@kingkong.com.au account)
- Put the site key in the data-recaptcha attribute on the script element:

```<script src="https://scripts.kingkong.net.au/tracker.min.js" data-recaptcha="XXXXXX_YOUR_RECAPTCHA_KEY_HERE_XXXXXX"></script>```

- Put the secret key in to the secret key field on the edit client page in the lead library

That's it!

Note: 
If the client is deleted/made inactive, the endpoint will report all leads as valid. If the recaptcha account itself is deleted the form will throw an error & not submit.


## Packages Used

**rollup-plugin-generate-image-sizes**

This is used to read the /dist/assets folder after it has been generated, and generates webp and image sizes from the image files in the directory. This happens at the end of the regular vite process.

**vite-plugin-compress**

Compresses assets generated by vite and assets from the public directory with Brotli, svgo, imagemin for pngs.

**postcss.config.js**

Postcss is configured to remove unused css using purgeCSS. It looks for any HTML files in the /src folder and only includes CSS that applies to them. If you need to stop purgeCSS from purging something, use the safelist functions here: https://purgecss.com/safelisting.html

**vite-plugin-posthtml**

This plugin processes the HTML after vite has compiled everything.

**vite-plugin-posthtml**

This plugin allows post processing of the HTML generated by Vite.

**posthtml-inline-svg**

Replaces `<icon>` tags with svg src with inline svgs. See above section on how to use this.

**posthtml-plugin-picture-srcset**

This is a custom posthtml plugin that was started to process the HTML and output picture tags along with the image height and width attributes. Currently it only functions if clearing the dist folder is turned off, and the files already exist.


# Build Checklist
- **Delete unused pages** - Delete any pages that are not in use. If your project doesnt include an ebook, remove the ```/src/free-ebook/``` directory, and if it doesn't have a questionnaire, remove the ```/src/questionnaire/``` directory.

- **Thank you page** - Always include a thank you page. There is a template for this page located in the ```/src/thankyou/``` folder, please allow your CSS styles to apply to this page so it fits in with the design of the project we are building.

- **Validation:** - Make sure that the form is validating properly. Activecampaign scripts should be stripped entirely from the form (anything between the ```<script>``` tags) and Infusionsoft forms should have all ```<script src="..."``` tags removed except the ```getTrackingCode```, ```timezoneInputJs```, and ```overwriteRefererJs``` scripts. More information on implementing this can be found [here](#form-validation)

- **Opt in success message** - All opt in pages (the free-ebook and similar pages) should utilise the opt in success message built into the boilerplate. How to implement this is explained [here](#thank-you-message).

- **Remove unused scripts** - Any scripts that are not used in the project should be commented out so they do not compile with the rest of the JS. This can be done in the ```/src/assets/js/main.js``` file, by commenting out the import statement and the function that calls that item.

- **Upload ebook PDF** - If your project contains an opt in page, it should have a downloadable PDF that is uploaded to the project repository in the ```/public/``` folder. This will allow it to persist when the project is built.

- **Include fonts locally** - When including fonts please convert the font file into woff and woff2 using a tool like [transfonter](https://transfonter.org), and importing the font using CSS. There is an example of how to include the font inside of the ```/src/assets/css/globals/_typography.scss``` file.

- **Only lazyload above the fold** - The ```nolazy``` attribute should only be added to images above the fold (images that are visible in the hero section when the page initially loads), and slider images (the slider has its own lazyloading). All other images should not have this attribute as it stops the image from being lazyloaded, thus reducing our load times.

---

# Lead Library

The lead library script should be included at the bottom of every page that contains a form.
This is the script:

```javascript
<script src="https://scripts.kingkong.net.au/tracker.min.js"></script>
```

## Classes & Utilities

You can add these classes to the ```<form>``` element to use different utilities:

- ```kk-validation```
  - Adds form validation to all fields
  - Ensure the fields have the correct ```[type]``` and ```[required]``` attributes set.
- ```kk-global```
  - Exposes a global JS function called ```_sendToLeadLibrary()```
  - This function sends the lead to the lead library and fires dataLayer events as if the form had submitted normally.
  - Handy if the form doesn't redirect or fire "submit" events.
```javascript
let yourForm = document.querySelector('#your-form-id');
_sendToLeadLibrary(yourForm);
```
- ```kk-showthankyou```
  - When the form is submitted it will store a variable in localStorage
  - If the opt-in page loads with this variable in localStorage the thankyou popup will appear
- ```kk-nosend```
  - GTM Tracking will fire but it won't be saved in the lead library
- ```disable-honeypot```
  - Will stop the lead library from adding the ```<input name="planet"/>``` honeypot
- ```skip-lead-library```
  - The lead library won't process this form at all

### Input Field Classes

- ```kk-novalidate``` 
  - Can be added to an email field to prevent the script from validating the email address
- ```kk-numeric```
  - Can be added to a text input to only allow digits 0-9

### Contact Form 7

ContactForm7, if you include a hidden field with the name ```kkredirect```, the lead library will wait for the "wpcf7mailsent" dom event from CF7, and redirect the form to the value of that hidden field.

### Form Messages

The following form messages can be overwritten, by adding a ```<div>``` with the class ```.form-messages```.

Then a data attribute for each relevant message:

```data-success``` - Successful form submit

```data-required``` - When any required field is missed

```data-requiredfield``` - Individual required field error

```data-invalidemail``` - When email field is invalid

```data-invalidphone``` - When phone field is invalid

e.g
```html
<div class="form-messages" data-success="Success Message" data-required="Please ensure all required fields have been completed."></div>
```