<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { shipment } from '$lib/shipment';

	let trackingCode = $state('');
	let hasError = $state(false);

	function submitLookup(event: SubmitEvent) {
		event.preventDefault();
		const code = trackingCode.trim();
		hasError = code.length === 0;

		if (code) {
			void goto(resolve('/t/[code]', { code: code.toUpperCase() }));
		}
	}
</script>

<svelte:head>
	<title>Track a shipment · {shipment.brand}</title>
	<meta
		name="description"
		content="Enter a Pasabuy Priority tracking number to view shipment progress."
	/>
</svelte:head>

<main class="lookup-page">
	<section class="lookup-panel" aria-labelledby="lookup-title">
		<div class="brand-lockup" aria-label={shipment.brand}>
			<span class="brand-mark">PP</span>
			<span>{shipment.brand}</span>
		</div>
		<div class="lookup-content">
			<p class="kicker">Shipment tracking</p>
			<h1 id="lookup-title">Track your shipment</h1>
			<p class="intro">Enter your tracking number to see the latest shipment event.</p>
			<form onsubmit={submitLookup} novalidate>
				<label for="tracking-number">Tracking number</label>
				<div class="form-row">
					<input
						id="tracking-number"
						name="tracking-number"
						type="text"
						bind:value={trackingCode}
						autocomplete="off"
						aria-invalid={hasError}
						aria-describedby={hasError ? 'lookup-error' : undefined}
					/>
					<button type="submit">Track shipment <span aria-hidden="true">→</span></button>
				</div>
				{#if hasError}
					<p id="lookup-error" class="error" role="alert">Enter a tracking number to continue.</p>
				{/if}
			</form>
		</div>
		<div class="panel-footer">
			<span>{shipment.division}</span><span>Secure tracking lookup</span>
		</div>
	</section>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		background: #f3f0e8;
		color: #252524;
		font-family: 'Avenir Next', 'Trebuchet MS', sans-serif;
	}
	.lookup-page {
		align-items: center;
		display: flex;
		min-height: 100svh;
		padding: 24px;
	}
	.lookup-panel {
		background: #fffdf8;
		border: 1px solid #25252422;
		box-shadow: 0 20px 60px #2525240d;
		margin: auto;
		max-width: 680px;
		padding: 26px;
		width: 100%;
	}
	.brand-lockup {
		align-items: center;
		border-bottom: 1px solid #2525241c;
		display: flex;
		font-size: 13px;
		font-weight: 800;
		gap: 10px;
		padding-bottom: 22px;
	}
	.brand-mark {
		align-items: center;
		background: #ef5b2a;
		color: #fff;
		display: inline-flex;
		font:
			500 10px 'DM Mono',
			monospace;
		height: 29px;
		justify-content: center;
		letter-spacing: -0.08em;
		width: 29px;
	}
	.lookup-content {
		padding: 74px 0 82px;
	}
	.kicker {
		color: #ef5b2a;
		font:
			10px 'DM Mono',
			monospace;
		letter-spacing: 0.12em;
		margin: 0 0 17px;
		text-transform: uppercase;
	}
	h1 {
		font:
			400 clamp(42px, 8vw, 68px)/0.98 Georgia,
			serif;
		letter-spacing: -0.065em;
		margin: 0 0 18px;
	}
	.intro {
		color: #6a6861;
		font-size: 15px;
		line-height: 1.55;
		margin: 0 0 38px;
	}
	form label {
		display: block;
		font:
			10px 'DM Mono',
			monospace;
		letter-spacing: 0.08em;
		margin-bottom: 9px;
		text-transform: uppercase;
	}
	.form-row {
		display: flex;
		gap: 10px;
	}
	input {
		background: #f3f0e8;
		border: 1px solid #25252444;
		border-radius: 0;
		color: #252524;
		font:
			14px 'DM Mono',
			monospace;
		min-width: 0;
		padding: 15px;
		width: 100%;
	}
	input:focus {
		border-color: #ef5b2a;
		box-shadow: 0 0 0 3px #ef5b2a29;
		outline: none;
	}
	input[aria-invalid='true'] {
		border-color: #b83b25;
	}
	button {
		background: #252524;
		border: 0;
		color: #fff;
		cursor: pointer;
		font:
			600 12px 'Avenir Next',
			sans-serif;
		min-width: 154px;
		padding: 0 17px;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}
	button:hover {
		background: #ef5b2a;
		transform: translateY(-1px);
	}
	button:focus-visible {
		outline: 3px solid #ef5b2a66;
		outline-offset: 3px;
	}
	.error {
		color: #b83b25;
		font-size: 12px;
		margin: 10px 0 0;
	}
	.panel-footer {
		border-top: 1px solid #2525241c;
		color: #77746c;
		display: flex;
		font:
			9px 'DM Mono',
			monospace;
		justify-content: space-between;
		letter-spacing: 0.06em;
		padding-top: 16px;
		text-transform: uppercase;
	}
	@media (max-width: 560px) {
		.lookup-page {
			padding: 14px;
		}
		.lookup-panel {
			padding: 20px;
		}
		.lookup-content {
			padding: 62px 0 68px;
		}
		.form-row {
			display: grid;
		}
		.form-row button {
			min-height: 51px;
		}
		.panel-footer {
			gap: 20px;
			line-height: 1.5;
		}
		.panel-footer span:last-child {
			text-align: right;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
