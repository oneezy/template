<script>
	let {
		text = false,
		img = false,
		blog = false,
		children = null,
		typography = true,
		...props
	} = $props();
</script>

<div
	{...props}
	class="{props.class} {typography
		? 'prose lg:prose-xl dark:prose-invert'
		: ''}"
>
	{#if children}
		{@render children()}
	{:else if text}
		<section>
			{@render textContent()}
		</section>
	{:else if img}
		<figure>
			{@render imgContent()}
		</figure>
	{:else if blog}
		<article>
			{@render blogContent()}
		</article>
	{:else}
		hi mom
	{/if}
</div>

{#snippet textContent()}
	<h1>Title</h1>
	<h2>Title</h2>
	<h3>Subtitle</h3>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio dicta
		repellendus? Architecto assumenda aliquam explicabo maiores animi maxime ab
		ullam exercitationem et optio, laboriosam laborum odit esse officia quia.
	</p>
{/snippet}

{#snippet imgContent()}
	<img src="https://picsum.photos/500" alt="picsum foto" />
{/snippet}

{#snippet blogContent()}
	<p class="lead">
		Until now, trying to style an article, document, or blog post with Tailwind
		has been a very tedious task.
	</p>

	<p>
		The <code>@tailwindcss/typography</code> plugin is our attempt to give you
		what you
		<em>actually</em> want, without any of the downsides of doing something stupid
		like disabling our base styles.
	</p>
	<blockquote>
		<p>
			Why is Tailwind removing the default styles on my <code>h1</code> elements?
			How do I disable this? What do you mean I lose all the other base styles too?
		</p>
	</blockquote>
	<div class="not-prose">
		<h2>Shouldn&#39;t be colored</h2>
	</div>

	<pre><code class="lang-html">
But <span class="hljs-keyword">a</span> recent study shows that <span
				class="hljs-keyword">the</span
			> celebrated appetizer may be linked <span class="hljs-built_in">to</span
			> <span class="hljs-keyword">a</span> series <span class="hljs-keyword"
				>of</span
			> rabies cases
springing up around <span class="hljs-keyword">the</span> country.
/
</code></pre>
	<p>
		For more information about how to use the plugin and the features it
		includes, <a
			href="https://github.com/tailwindcss/typography/blob/master/README.md"
			>read the documentation</a
		>.
	</p>
	<hr />
	<h2 id="this-is-a-heading">This is a heading</h2>
	<ol>
		<li>We want everything to look good out of the box.</li>
		<li>
			Really just the first reason, that&#39;s the whole point of the plugin.
		</li>
		<li>
			Here&#39;s a third pretend reason though a list with three items looks
			more realistic than a list with two items.
		</li>
	</ol>
	<p>
		Now <strong>I&#39;m going to show you</strong> an example of an unordered list
		to make sure that looks good, too:
	</p>
	<ul>
		<li>So here is the first item in this list.</li>
		<li>In this example we&#39;re keeping the items short.</li>
		<li>Later, we&#39;ll use longer, more complex list items.</li>
	</ul>
	<p>Let&#39;s even style a table:</p>
	<table>
		<thead>
			<tr>
				<th>Wrestler</th>
				<th>Origin</th>
				<th>Finisher</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Bret &quot;The Hitman&quot; Hart</td>
				<td>Calgary, AB</td>
				<td>Sharpshooter</td>
			</tr>
			<tr>
				<td>Stone Cold Steve Austin</td>
				<td>Austin, TX</td>
				<td>Stone Cold Stunner</td>
			</tr>
			<tr>
				<td>Randy Savage</td>
				<td>Sarasota, FL</td>
				<td>Elbow Drop</td>
			</tr>
			<tr>
				<td>Vader</td>
				<td>Boulder, CO</td>
				<td>Vader Bomb</td>
			</tr>
			<tr>
				<td>Razor Ramon</td>
				<td>Chuluota, FL</td>
				<td>Razor&#39;s Edge</td>
			</tr>
		</tbody>
	</table>
	<p>Finally, a figure with a caption:</p>
	<figure>
		<img
			src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=500&q=80"
			alt=""
		/>
		<figcaption>
			Contrary to popular belief, Lorem Ipsum is not simply random text. It has
			roots in a piece of classical Latin literature from 45 BC, making it over
			2000 years old.
		</figcaption>
	</figure>

	<p>And that&#39;s the end of our little demo.</p>
{/snippet}
