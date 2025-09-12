/**
 * Sample content data for the Content component
 * Provides rich HTML examples for different use cases
 */
export const openprops = `
<div id="top" role="document">
	<header>
		<div class="open-props">
			<h1>Open Props</h1>
		</div>
		<p>
			A <a
				href="https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css#:~:text=51-,Normalize.,over%20the%20styling%20of%20everything."
				>normalize</a
			>
			using Open Props! Minimal styles for all HTML elements. Plus, it's adaptive to light and dark.
			The props are made available for you to continue building
			<a href="https://codepen.io/argyleink/pen/jOLaBgG">components</a> too.
		</p>
		<div>
			<h4>Included adaptive props</h4>
			<h3>4 Surface Colors</h3>
			<p>
				Great for cards, buttons, borders, sidenavs, wells, etc. When you want to change the
				perception of layering and grouping.
			</p>
			<div class="surface-samples">
				<div class="surface1 rad-shadow">var(--surface-1)</div>
				<div class="surface2 rad-shadow">var(--surface-2)</div>
				<div class="surface3 rad-shadow">var(--surface-3)</div>
				<div class="surface4 rad-shadow">var(--surface-4)</div>
			</div>
		</div>

		<div class="text-samples">
			<h3>2 Text Colors, 2 link colors</h3>
			<h5 class="text1">
				<span class="swatch link rad-shadow"></span>
				var(--link)
			</h5>
			<h5 class="text1">
				<span class="swatch link-visited rad-shadow"></span>
				var(--link-visited)
			</h5>
			<h5 class="text1">
				<span class="swatch text1 rad-shadow"></span>
				var(--text-1)
			</h5>
			<h5 class="text2">
				<span class="swatch text2 rad-shadow"></span>
				var(--text-2)
			</h5>
			<p>
				Using these props results in colors that adapt to the users system theme preference
				automatically.
			</p>
			<p>
				The brand color is used sparingly, find it used in the HTML elements below! The link color
				is useful for buttons and other custom components you want to have consistent interactive
				text for.
			</p>
		</div>
		<hr />
		<h2>Normalized HTML5 Elemenets</h2>
		<p>Based on <a href="https://cbracco.github.io/html5-test-page">this html5 test page</a>.</p>
	</header>
	<nav role="navigation">
		<ul>
			<li>
				<a href="#text">Text</a>
				<ul>
					<li><a href="#text__headings">Headings</a></li>
					<li><a href="#text__paragraphs">Paragraphs</a></li>
					<li><a href="#text__blockquotes">Blockquotes</a></li>
					<li><a href="#text__lists">Lists</a></li>
					<li><a href="#text__hr">Horizontal rules</a></li>
					<li><a href="#text__tables">Tabular data</a></li>
					<li><a href="#text__code">Code</a></li>
					<li><a href="#text__inline">Inline elements</a></li>
					<li><a href="#text__comments">HTML Comments</a></li>
				</ul>
			</li>
			<li>
				<a href="#embedded">Embedded content</a>
				<ul>
					<li><a href="#embedded__images">Images</a></li>
					<li><a href="#embedded__audio">Audio</a></li>
					<li><a href="#embedded__video">Video</a></li>
					<li><a href="#embedded__canvas">Canvas</a></li>
					<li><a href="#embedded__meter">Meter</a></li>
					<li><a href="#embedded__progress">Progress</a></li>
					<li><a href="#embedded__svg">Inline SVG</a></li>
					<li><a href="#embedded__iframe">IFrames</a></li>
				</ul>
			</li>
			<li>
				<a href="#forms">Form elements</a>
				<ul>
					<li><a href="#forms__input">Input fields</a></li>
					<li><a href="#forms__select">Select menus</a></li>
					<li><a href="#forms__checkbox">Checkboxes</a></li>
					<li><a href="#forms__radio">Radio buttons</a></li>
					<li><a href="#forms__textareas">Textareas</a></li>
					<li><a href="#forms__html5">HTML5 inputs</a></li>
					<li><a href="#forms__action">Action buttons</a></li>
				</ul>
			</li>
		</ul>
	</nav>
	<main role="main">
		<section id="text">
			<article id="text__headings">
				<div>
					<h1>Heading 1</h1>
					<h2>Heading 2</h2>
					<h3>Heading 3</h3>
					<h4>Heading 4</h4>
					<h5>Heading 5</h5>
					<h6>Heading 6</h6>
				</div>
			</article>
			<article id="text__paragraphs">
				<header><h1>Paragraphs</h1></header>
				<div>
					<p>
						A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a
						self-contained unit of a discourse in writing dealing with a particular point or idea. A
						paragraph consists of one or more sentences. Though not required by the syntax of any
						language, paragraphs are usually an expected part of formal writing, used to organize
						longer prose.
					</p>
				</div>
			</article>
			<article id="text__blockquotes">
				<header><h1>Blockquotes</h1></header>
				<div>
					<blockquote>
						<p>
							A block quotation (also known as a long quotation or extract) is a quotation in a
							written document, that is set off from the main text as a paragraph, or block of text.
						</p>
						<p>
							It is typically distinguished visually using indentation and a different typeface or
							smaller size quotation. It may or may not include a citation, usually placed at the
							bottom.
						</p>
						<cite><a href="#!">Said no one, ever.</a></cite>
					</blockquote>
				</div>
			</article>
			<article id="text__lists">
				<header><h1>Lists</h1></header>
				<div>
					<h3>Definition list</h3>
					<dl>
						<dt>Definition List Title</dt>
						<dd>This is a definition list division.</dd>

						<dt>Definition List Title 2</dt>
						<dd>This is a definition list division item with a lot more to say.</dd>
					</dl>
					<h3>Ordered List</h3>
					<ol>
						<li>List Item 1</li>
						<li>List Item 2</li>
						<li>List Item 3</li>
					</ol>
					<h3>Unordered List</h3>
					<ul>
						<li>List Item 1</li>
						<li>List Item 2</li>
						<li>List Item 3</li>
					</ul>
					<h3>Details</h3>
					<details>
						<summary>Details and summary element</summary>

						<p>Example paragraph text.</p>
					</details>
				</div>
			</article>
			<article id="text__hr">
				<header><h1>Horizontal rules</h1></header>
				<div>
					<hr />
				</div>
			</article>
			<article id="text__tables">
				<header><h1>Tabular data</h1></header>
				<table>
					<caption>Table Caption</caption>
					<thead>
						<tr>
							<th>Table Heading 1</th>
							<th>Table Heading 2</th>
							<th>Table Heading 3</th>
							<th>Table Heading 4</th>
							<th>Table Heading 5</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th>Table Footer 1</th>
							<th>Table Footer 2</th>
							<th>Table Footer 3</th>
							<th>Table Footer 4</th>
							<th>Table Footer 5</th>
						</tr>
					</tfoot>
					<tbody>
						<tr>
							<td>Table Cell 1</td>
							<td>Table Cell 2</td>
							<td>Table Cell 3</td>
							<td>Table Cell 4</td>
							<td>Table Cell 5</td>
						</tr>
						<tr>
							<td>Table Cell 1</td>
							<td>Table Cell 2</td>
							<td>Table Cell 3</td>
							<td>Table Cell 4</td>
							<td>Table Cell 5</td>
						</tr>
						<tr>
							<td>Table Cell 1</td>
							<td>Table Cell 2</td>
							<td>Table Cell 3</td>
							<td>Table Cell 4</td>
							<td>Table Cell 5</td>
						</tr>
						<tr>
							<td>Table Cell 1</td>
							<td>Table Cell 2</td>
							<td>Table Cell 3</td>
							<td>Table Cell 4</td>
							<td>Table Cell 5</td>
						</tr>
					</tbody>
				</table>
			</article>
			<article id="text__code">
				<header><h1>Code</h1></header>
				<div>
					<p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
					<p><strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code></p>
					<p>
						<strong>Sample output:</strong>
						<samp>This is sample output from a computer program.</samp>
					</p>
					<h2>Pre-formatted text</h2>
				</div>
			</article>
			<article id="text__inline">
				<header><h1>Inline elements</h1></header>
				<div>
					<p><a href="#!">This is a text link</a>.</p>
					<p><strong>Strong is used to indicate strong importance.</strong></p>
					<p><em>This text has added emphasis.</em></p>
					<p>
						The <b>b element</b> is stylistically different text from normal text, without any special
						importance.
					</p>
					<p>The <i>i element</i> is text that is offset from the normal text.</p>
					<p>
						The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual
						annotation.
					</p>
					<p><del>This text is deleted</del> and <ins>This text is inserted</ins>.</p>
					<p><s>This text has a strikethrough</s>.</p>
					<p>Superscript<sup>®</sup>.</p>
					<p>Subscript for things like H<sub>2</sub>O.</p>
					<p><small>This small text is small for for fine print, etc.</small></p>
					<p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
					<p><q cite="google.com">This text is a short inline quotation.</q></p>
					<p><cite>This is a citation.</cite></p>
					<p>The <dfn>dfn element</dfn> indicates a definition.</p>
					<p>The <mark>mark element</mark> indicates a highlight.</p>
					<p>The <var>variable element</var>, such as <var>x</var> = <var>y</var>.</p>
					<p>The time element: <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time></p>
				</div>
			</article>
			<article id="text__comments">
				<header><h1>HTML Comments</h1></header>
				<div>
					<p>There is comment here: <!--This comment should not be displayed--></p>
					<p>There is a comment spanning multiple tags and lines below here.</p>
					<!--<p><a href="#!">This is a text link. But it should not be displayed in a comment</a>.</p>
              <p><strong>Strong is used to indicate strong importance. But, it should not be displayed in a comment</strong></p>
              <p><em>This text has added emphasis. But, it should not be displayed in a comment</em></p>-->
				</div>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</article>
		</section>
		<section id="embedded">
			<header><h1>Embedded content</h1></header>
			<article id="embedded__images">
				<header><h2>Images</h2></header>
				<div class="spaced">
					<h5>No <code>&lt;figure&gt;</code> element</h5>
					<p>
						<img
							src="https://doodleipsum.com/420/outline?bg=7463D9&i=5493adbcd8a47597df8e1fc4b1b87733"
							alt="alt text"
						/>
					</p>
					<h5>
						Wrapped in a <code>&lt;figure&gt;</code> element, no <code>&lt;figcaption&gt;</code>
					</h5>
					<figure>
						<img
							src="https://doodleipsum.com/420/outline?bg=7463D9&i=5493adbcd8a47597df8e1fc4b1b87733"
							alt="alt text"
						/>
					</figure>
					<h5>
						Wrapped in a <code>&lt;figure&gt;</code> element, with a <code>&lt;figcaption&gt;</code>
					</h5>
					<figure>
						<img
							src="https://doodleipsum.com/420/outline?bg=7463D9&i=5493adbcd8a47597df8e1fc4b1b87733"
							alt="alt text"
						/>
						<figcaption>Here is a caption for this image.</figcaption>
					</figure>
				</div>
			</article>
			<article id="embedded__audio">
				<header><h2>Audio</h2></header>
				<div><audio controls="">audio</audio></div>
			</article>
			<article id="embedded__video">
				<header><h2>Video</h2></header>
				<div><video controls="">video</video></div>
			</article>
			<article id="embedded__canvas">
				<header><h2>Canvas</h2></header>
				<div><canvas>canvas</canvas></div>
			</article>
			<article id="embedded__meter">
				<header><h2>Meter</h2></header>
				<div><meter value="2" min="0" max="10">2 out of 10</meter></div>
			</article>
			<article id="embedded__progress">
				<header><h2>Progress</h2></header>
				<div>
					<progress indeterminate>progress</progress>
					<progress value=".5">progress</progress>
				</div>
			</article>
			<article id="embedded__svg">
				<header><h2>Inline SVG</h2></header>
				<div>
					<svg width="100px" height="100px"
						><circle cx="100" cy="100" r="100" fill="#1fa3ec"></circle></svg
					>
				</div>
			</article>
			<article id="embedded__iframe">
				<header><h2>IFrame</h2></header>
				<div><iframe src="https://oneezy.com" title="oneezy" height="300"></iframe></div>
			</article>
		</section>
		<section id="forms">
			<header><h1>Form elements</h1></header>
			<form>
				<fieldset id="forms__input">
					<legend>Input fields</legend>
					<p>
						<label for="input__text">Text Input</label>
						<input id="input__text" type="text" placeholder="Text Input" />
					</p>
					<p>
						<label for="input__password">Password</label>
						<input id="input__password" type="password" placeholder="Type your Password" />
					</p>
					<p>
						<label for="input__webaddress">Web Address</label>
						<input id="input__webaddress" type="url" placeholder="http://yoursite.com" />
					</p>
					<p>
						<label for="input__emailaddress">Email Address</label>
						<input id="input__emailaddress" type="email" placeholder="name@email.com" />
					</p>
					<p>
						<label for="input__phone">Phone Number</label>
						<input id="input__phone" type="tel" placeholder="(999) 999-9999" />
					</p>
					<p>
						<label for="input__search">Search</label>
						<input id="input__search" type="search" placeholder="Enter Search Term" />
					</p>
					<p>
						<label for="input__text2">Number Input</label>
						<input id="input__text2" type="number" placeholder="Enter a Number" />
					</p>
					<p>
						<label for="input__text3" class="error">Error</label>
						<input id="input__text3" class="is-error" type="text" placeholder="Text Input" />
					</p>
					<p>
						<label for="input__text4" class="valid">Valid</label>
						<input id="input__text4" class="is-valid" type="text" placeholder="Text Input" />
					</p>
				</fieldset>
				<fieldset id="forms__select">
					<legend>Select menus</legend>
					<p>
						<label for="select">Select</label>
						<select id="select">
							<optgroup label="Option Group">
								<option>Option One</option>
								<option>Option Two</option>
								<option>Option Three</option>
							</optgroup>
						</select>
					</p>
				</fieldset>
				<fieldset id="forms__checkbox">
					<legend>Checkboxes</legend>
					<ul class="list list--bare">
						<li>
							<label for="checkbox1"
								><input id="checkbox1" name="checkbox" type="checkbox" checked="checked" /> Choice A</label
							>
						</li>
						<li>
							<label for="checkbox2"
								><input id="checkbox2" name="checkbox" type="checkbox" /> Choice B</label
							>
						</li>
						<li>
							<label for="checkbox3"
								><input id="checkbox3" name="checkbox" type="checkbox" /> Choice C</label
							>
						</li>
					</ul>
				</fieldset>
				<fieldset id="forms__radio">
					<legend>Radio buttons</legend>
					<ul class="list list--bare">
						<li>
							<label for="radio1"
								><input id="radio1" name="radio" type="radio" class="radio" checked="checked" /> Option
								1</label
							>
						</li>
						<li>
							<label for="radio2"
								><input id="radio2" name="radio" type="radio" class="radio" /> Option 2</label
							>
						</li>
						<li>
							<label for="radio3"
								><input id="radio3" name="radio" type="radio" class="radio" /> Option 3</label
							>
						</li>
					</ul>
				</fieldset>
				<fieldset id="forms__textareas">
					<legend>Textareas</legend>
					<p>
						<label for="textarea">Textarea</label>
						<textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"
						></textarea>
					</p>
				</fieldset>
				<fieldset id="forms__html5">
					<legend>HTML5 inputs</legend>
					<p>
						<label for="ic">Color input</label>
						<input type="color" id="ic" value="#000000" />
					</p>
					<p>File input <input type="file" /></p>
					<p>
						<label for="in">Number input</label>
						<input type="number" id="in" min="0" max="10" value="5" />
					</p>
					<p>
						<label for="ir">Range input</label>
						<input type="range" id="ir" value="10" />
					</p>
					<p>
						<label for="ir">Progress input</label>
						<progress></progress>
						<progress value=".5">50%</progress>
					</p>
					<p>
						<label for="idd">Date input</label>
						<input type="date" id="idd" value="1970-01-01" />
					</p>
					<p>
						<label for="idm">Month input</label>
						<input type="month" id="idm" value="1970-01" />
					</p>
					<p>
						<label for="idw">Week input</label>
						<input type="week" id="idw" value="1970-W01" />
					</p>
					<p>
						<label for="idt">Datetime input</label>
						<input type="datetime" id="idt" value="1970-01-01T00:00:00Z" />
					</p>
					<p>
						<label for="idtl">Datetime-local input</label>
						<input type="datetime-local" id="idtl" value="1970-01-01T00:00" />
					</p>
				</fieldset>
				<fieldset id="forms__action">
					<legend>Action buttons</legend>
					<p class="buttons-list">
						<input type="submit" value="&lt;input type=submit&gt;" />
						<input type="button" value="&lt;input type=button&gt;" />
						<input type="reset" value="&lt;input type=reset&gt;" />
						<input type="submit" value="&lt;input disabled&gt;" disabled="" />
					</p>
					<br />
					<p class="buttons-list">
						<button type="submit">&lt;button type=submit&gt;</button>
						<button type="button">&lt;button type=button&gt;</button>
						<button type="reset">&lt;button type=reset&gt;</button>
						<button type="button" disabled="">&lt;button disabled&gt;</button>
					</p>
				</fieldset>
			</form>
		</section>
	</main>
</div>
`;

export const all = `
<h1>HTML Kitchen Sink</h1>
<p class="lead">This demonstrates all the HTML elements that the Content component can style beautifully.</p>

<h2>Typography Examples</h2>
<p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <code>inline code</code>. 
You can also have <a href="#link">links that look great</a> within your content.</p>

<h3>Lists Work Perfectly</h3>
<ul>
    <li>Unordered list item one</li>
    <li>List item with <strong>formatting</strong></li>
    <li>Third item with a <a href="#nested">nested link</a></li>
</ul>

<ol>
    <li>First ordered item</li>
    <li>Second with <em>emphasis</em></li>
    <li>Third item completes the set</li>
</ol>

<h3>Blockquotes & Code</h3>
<blockquote>
    <p>This is a beautifully styled blockquote that stands out from regular paragraph text.</p>
    <cite>— Content Component Documentation</cite>
</blockquote>

<pre><code>// Code blocks are properly formatted
function example() {
    return "This code looks great!";
}

const data = {
    color: true,
    readable: true
};</code></pre>

<h3>Tables Are Responsive</h3>
<table>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Status</th>
            <th>Priority</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Typography</td>
            <td>✅ Complete</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Responsive Design</td>
            <td>✅ Complete</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Dark Mode</td>
            <td>✅ Complete</td>
            <td>Medium</td>
        </tr>
    </tbody>
</table>

<h3>Visual Elements</h3>
<p>Images and figures work seamlessly:</p>

<figure>
    <img src="https://picsum.photos/600/300" alt="Beautiful landscape" />
    <figcaption>Images automatically get proper spacing and captions.</figcaption>
</figure>

<hr />

<h2>More Advanced Content</h2>
<p>The Content component handles complex nested structures, maintains proper spacing, 
and ensures everything looks cohesive regardless of the HTML complexity.</p>

<div class="not-prose">
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
        <p class="font-semibold text-blue-800 dark:text-blue-200">Pro Tip</p>
        <p class="text-blue-700 dark:text-blue-300">Use <code>not-prose</code> class to exclude specific elements from typography styling.</p>
    </div>
</div>

<p><small>This content demonstrates the full capabilities of the Content component's styling system.</small></p>
`;

export const small = `
<h1>Simple Text Content</h1>
<h2>Perfect for Basic Articles</h2>
<p>This is ideal for simple text-based content that needs clean, readable typography without complex layouts.</p>

<h3>Key Benefits</h3>
<p>Clean typography, proper spacing, and excellent readability make this perfect for:</p>
<ul>
    <li>Blog posts and articles</li>
    <li>Documentation pages</li>
    <li>Simple content areas</li>
</ul>
`;

export const blog = `
<article>
    <header>
        <h1>Building Better Web Components</h1>
        <p class="lead">A comprehensive guide to creating reusable, accessible, and maintainable web components.</p>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <time datetime="2025-08-21">August 21, 2025</time> • 
            <span>5 min read</span> • 
            <span>Development</span>
        </div>
    </header>

    <h2>Introduction</h2>
    <p>Modern web development demands components that are not only functional but also accessible, maintainable, and delightful to use. This article explores best practices for component development.</p>

    <h3>Core Principles</h3>
    <ol>
        <li><strong>Accessibility First</strong> - Every component should be usable by everyone</li>
        <li><strong>Performance Matters</strong> - Optimize for speed and efficiency</li>
        <li><strong>Developer Experience</strong> - Make components easy to use and understand</li>
    </ol>

    <blockquote>
        <p>"The best components are invisible to users but obvious to developers."</p>
        <cite>— UX Engineering Principles</cite>
    </blockquote>

    <h3>Implementation Strategy</h3>
    <p>When building components, consider these technical aspects:</p>

    <pre><code>// Example component structure
export interface ComponentProps {
    appearance?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

function Component({ appearance = 'primary', ...props }) {
    return &lt;div className={getVariantStyles(appearance)} {...props} /&gt;;
}</code></pre>

    <h3>Testing & Validation</h3>
    <p>Comprehensive testing ensures reliability:</p>
    <ul>
        <li>Unit tests for component logic</li>
        <li>Visual regression tests for UI consistency</li>
        <li>Accessibility audits with automated tools</li>
        <li>Performance benchmarks for optimization</li>
    </ul>

    <figure>
        <img src="https://picsum.photos/800/400" alt="Component testing workflow" />
        <figcaption>A typical component testing and validation workflow</figcaption>
    </figure>

    <h2>Conclusion</h2>
    <p>Building great components requires attention to detail, user empathy, and technical excellence. By following these principles, you can create components that truly enhance the user experience.</p>

    <hr />
    
    <footer class="text-sm text-gray-600 dark:text-gray-400">
        <p>Want to learn more? Check out our <a href="#resources">component library documentation</a> and <a href="#examples">interactive examples</a>.</p>
    </footer>
</article>
`;

export const minimalSample = `
<h2>Minimal Content</h2>
<p>Sometimes less is more. This minimal appearance provides just the essential content without overwhelming the user.</p>
<p><a href="#more">Learn more</a></p>
`;

// Image samples for different contexts
export const imageSamples = {
	landscape: "https://picsum.photos/800/400",
	portrait: "https://picsum.photos/400/600",
	square: "https://picsum.photos/500/500",
	wide: "https://picsum.photos/1200/300",
	article: "https://picsum.photos/600/300",
};

export const sampleCaptions = [
	"A beautiful example of responsive image handling",
	"This image demonstrates proper figure and caption styling",
	"Images integrate seamlessly with content flow",
	"Professional image presentation with accessibility in mind",
];
