<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { getShipment } from '$lib/shipment';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let trackedShipment = $derived(getShipment(params.code));
	let completedCount = $derived(
		trackedShipment?.events.filter((event) => event.status === 'completed').length ?? 0
	);
	let totalEvents = $derived(trackedShipment?.events.length ?? 1);
	let progress = $derived(Math.round((completedCount / totalEvents) * 100));
</script>

<svelte:head>
	<title
		>{trackedShipment
			? `${trackedShipment.trackingNumber} · ${trackedShipment.brand}`
			: 'Tracking number not found · Pasabuy Priority'}</title
	>
	<meta
		name="description"
		content={trackedShipment
			? `Shipment status for ${trackedShipment.trackingNumber}.`
			: 'The requested Pasabuy Priority tracking number could not be found.'}
	/>
	{#if trackedShipment}
		<meta property="og:image" content={asset('/og-pasabuy.png')} />
	{/if}
</svelte:head>

{#if trackedShipment}
	<main class="tracking-page">
		<header class="tracking-header">
			<a class="brand-lockup" href={resolve('/')} aria-label="Back to shipment lookup">
				<span class="brand-mark">PP</span><span>{trackedShipment.brand}</span>
			</a>
			<a class="back-link" href={resolve('/')}>Track another <span aria-hidden="true">↗</span></a>
		</header>

		<div class="tracking-container">
			<section class="tracking-title" aria-labelledby="tracking-title">
				<div>
					<p class="kicker">{trackedShipment.division}</p>
					<p class="tracking-code">{trackedShipment.trackingNumber}</p>
				</div>
				<p class="service-window">Aug 24—27, 2026<br /><span>Estimated hand-carry window</span></p>
			</section>

			<section class="status-panel" aria-labelledby="status-title">
				<div class="status-copy">
					<div class="status-label">
						<span class="status-dot" aria-hidden="true"></span><span>Current status</span>
					</div>
					<h1 id="status-title">{trackedShipment.current.status}</h1>
					<p>{trackedShipment.current.message}</p>
					<div class="status-time">
						<strong>{trackedShipment.current.location}</strong><span
							>{trackedShipment.current.date} · {trackedShipment.current.time}</span
						>
					</div>
				</div>
				<div class="parcel-card">
					<img src={asset(trackedShipment.parcelImage)} alt="Two tumblers for the shipment" /><span
						>Hand-carry<br />priority</span
					>
				</div>
			</section>

			<section class="summary-grid" aria-label="Shipment summary">
				<div class="summary-card route-card">
					<p class="card-label">Route</p>
					<div class="route-points">
						<div><span>Origin</span><strong>{trackedShipment.origin}</strong></div>
						<b aria-hidden="true">→</b>
						<div><span>Destination</span><strong>{trackedShipment.destination}</strong></div>
					</div>
				</div>
				<div class="summary-card">
					<p class="card-label">Shipment facts</p>
					<dl>
						<div>
							<dt>Contents</dt>
							<dd>{trackedShipment.package}</dd>
						</div>
						<div>
							<dt>Service</dt>
							<dd>{trackedShipment.service}</dd>
						</div>
						<div>
							<dt>Description</dt>
							<dd>{trackedShipment.description}</dd>
						</div>
					</dl>
				</div>
			</section>

			<section class="events-section" aria-labelledby="events-title">
				<div class="events-heading">
					<div>
						<p class="kicker">Movement history</p>
						<h2 id="events-title">Shipment events</h2>
					</div>
					<span class="progress-copy"
						>{completedCount} of {totalEvents}<small> completed</small></span
					>
				</div>
				<div class="progress-track" aria-label={`${progress}% of shipment events completed`}>
					<span style={`width: ${progress}%`}></span>
				</div>
				<ol class="events-list">
					{#each trackedShipment.events as event, index (event.id)}
						{@const isLastOfDay =
							index === trackedShipment.events.length - 1 ||
							trackedShipment.events[index + 1].date !== event.date}
						{#if index > 0 && trackedShipment.events[index - 1].date !== event.date}
							<li class="date-divider" aria-hidden="true"><span>{event.date}</span></li>
						{/if}
						<li
							class:completed={event.status === 'completed'}
							class:day-end={isLastOfDay}
							class="event-row"
						>
							<div class="event-marker" aria-hidden="true">
								{event.status === 'completed' ? '✓' : index + 1}
							</div>
							<article>
								<div class="event-meta">
									<time>{event.time}</time><span
										class:done={event.status === 'completed'}
										>{event.status === 'completed' ? 'Completed' : 'Scheduled'}</span
									>
								</div>
								<h3>{event.from} <b aria-hidden="true">→</b> {event.to}</h3>
								<p class="event-location"><span aria-hidden="true">📍</span>{event.location}</p>
								<p class="event-caption">{event.caption}</p>
								{#if trackedShipment.eventPeople[event.id]}
									<div class="event-person">
										{#if trackedShipment.eventPeople[event.id].avatarEmoji}
											<span class="event-avatar-emoji" aria-hidden="true"
												>{trackedShipment.eventPeople[event.id].avatarEmoji}</span
											>
										{:else}
											<img
												src={asset(trackedShipment.eventPeople[event.id].avatar ?? '')}
												alt={trackedShipment.eventPeople[event.id].alt}
											/>
										{/if}
										<strong>{trackedShipment.eventPeople[event.id].name}</strong>
									</div>
								{/if}
							</article>
						</li>
					{/each}
				</ol>
			</section>
		</div>
	</main>
{:else}
	<main class="not-found-page">
		<section class="not-found-card" aria-labelledby="not-found-title">
			<a class="brand-lockup" href={resolve('/')} aria-label="Back to shipment lookup"
				><span class="brand-mark">PP</span><span>Pasabuy Priority</span></a
			>
			<div class="not-found-content">
				<p class="kicker">Tracking lookup</p>
				<p class="not-found-code">{params.code}</p>
				<h1 id="not-found-title">Tracking number not found</h1>
				<p>
					We couldn't match that number to a shipment in this system. Check the code and try again.
				</p>
				<a class="primary-link" href={resolve('/')}
					>Return to tracking lookup <span aria-hidden="true">→</span></a
				>
			</div>
		</section>
	</main>
{/if}

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
	.tracking-page,
	.not-found-page {
		min-height: 100svh;
		padding: 24px;
	}
	.tracking-header {
		align-items: center;
		border-bottom: 1px solid #2525241c;
		display: flex;
		justify-content: space-between;
		margin: auto;
		max-width: 1100px;
		padding-bottom: 18px;
	}
	.brand-lockup {
		align-items: center;
		color: inherit;
		display: inline-flex;
		font-size: 13px;
		font-weight: 800;
		gap: 10px;
		text-decoration: none;
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
	.back-link {
		color: #6a6861;
		font:
			10px 'DM Mono',
			monospace;
		letter-spacing: 0.06em;
		text-decoration: none;
		text-transform: uppercase;
	}
	.back-link:hover,
	.primary-link:hover {
		color: #ef5b2a;
	}
	.tracking-container {
		margin: auto;
		max-width: 980px;
		padding: 56px 0 80px;
	}
	.tracking-title,
	.events-heading {
		align-items: end;
		display: flex;
		justify-content: space-between;
	}
	.kicker,
	.card-label,
	.status-label,
	time,
	.event-meta span,
	.progress-copy,
	.tracking-code,
	.service-window {
		font-family: 'DM Mono', monospace;
		text-transform: uppercase;
	}
	.kicker {
		color: #ef5b2a;
		font-size: 10px;
		letter-spacing: 0.11em;
		margin: 0 0 12px;
	}
	.tracking-code {
		font-size: 13px;
		letter-spacing: 0.08em;
		margin: 0;
	}
	.service-window {
		color: #252524;
		font-size: 11px;
		line-height: 1.65;
		margin: 0;
		text-align: right;
	}
	.service-window span {
		color: #77746c;
		font-size: 9px;
	}
	.status-panel {
		background: #252524;
		color: #fffdf8;
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr 220px;
		margin-top: 24px;
		min-height: 255px;
		padding: 34px;
	}
	.status-label {
		align-items: center;
		color: #ef5b2a;
		display: flex;
		font-size: 10px;
		gap: 9px;
		letter-spacing: 0.1em;
	}
	.status-dot {
		background: #ef5b2a;
		border-radius: 50%;
		height: 8px;
		width: 8px;
	}
	.status-copy h1 {
		font:
			400 clamp(34px, 5vw, 57px)/1 Georgia,
			serif;
		letter-spacing: -0.06em;
		margin: 26px 0 12px;
	}
	.status-copy > p {
		color: #c8c4bb;
		font-size: 13px;
		line-height: 1.55;
		margin: 0 0 29px;
		max-width: 470px;
	}
	.status-time {
		border-top: 1px solid #fffdf829;
		display: flex;
		font:
			11px 'DM Mono',
			monospace;
		gap: 18px;
		padding-top: 15px;
		text-transform: uppercase;
	}
	.status-time span {
		color: #c8c4bb;
	}
	.parcel-card {
		align-items: center;
		background: #e3ddd1;
		display: flex;
		justify-content: center;
		min-height: 180px;
		overflow: hidden;
		position: relative;
	}
	.parcel-card img {
		max-width: 85%;
		transform: rotate(-4deg);
	}
	.parcel-card span {
		bottom: 12px;
		color: #ef5b2a;
		font:
			9px 'DM Mono',
			monospace;
		left: 13px;
		line-height: 1.25;
		position: absolute;
		text-transform: uppercase;
	}
	.summary-grid {
		display: grid;
		gap: 14px;
		grid-template-columns: 1.2fr 1fr;
		margin-top: 14px;
	}
	.summary-card {
		background: #fffdf8;
		border: 1px solid #2525241c;
		min-height: 172px;
		padding: 22px;
	}
	.card-label {
		color: #77746c;
		font-size: 9px;
		letter-spacing: 0.1em;
		margin: 0 0 27px;
	}
	.route-points {
		align-items: center;
		display: grid;
		gap: 18px;
		grid-template-columns: 1fr auto 1fr;
	}
	.route-points div {
		display: grid;
		gap: 8px;
	}
	.route-points span,
	dt {
		color: #77746c;
		font:
			9px 'DM Mono',
			monospace;
		text-transform: uppercase;
	}
	.route-points strong {
		font-size: 17px;
		letter-spacing: -0.04em;
	}
	.route-points b {
		color: #ef5b2a;
		font-size: 21px;
		font-weight: 400;
	}
	dl {
		display: grid;
		gap: 11px;
		margin: 0;
	}
	dl div {
		display: flex;
		justify-content: space-between;
		gap: 15px;
	}
	dd {
		font-size: 12px;
		margin: 0;
		text-align: right;
	}
	.events-section {
		margin-top: 70px;
	}
	.events-heading h2 {
		font:
			400 39px/0.95 Georgia,
			serif;
		letter-spacing: -0.06em;
		margin: 0;
	}
	.progress-copy {
		color: #ef5b2a;
		font-size: 21px;
	}
	.progress-copy small {
		color: #77746c;
		display: block;
		font-size: 8px;
		letter-spacing: 0.08em;
		margin-top: 4px;
	}
	.progress-track {
		background: #2525241c;
		height: 3px;
		margin: 28px 0 30px;
	}
	.progress-track span {
		background: #ef5b2a;
		display: block;
		height: 100%;
		position: relative;
	}
	.progress-track span::after {
		background: #ef5b2a;
		border-radius: 50%;
		content: '';
		height: 8px;
		position: absolute;
		right: -4px;
		top: -2px;
		width: 8px;
	}
	.events-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.event-row {
		display: grid;
		gap: 17px;
		grid-template-columns: 31px 1fr;
		position: relative;
	}
	.event-row:not(:last-child):not(.day-end)::before {
		background: #2525242b;
		content: '';
		left: 14px;
		position: absolute;
		top: 31px;
		bottom: -23px;
		width: 1px;
	}
	.date-divider {
		align-items: center;
		display: flex;
		gap: 14px;
		margin: 10px 0 24px;
	}
	.date-divider::before,
	.date-divider::after {
		background: #2525242b;
		content: '';
		flex: 1;
		height: 1px;
	}
	.date-divider span {
		color: #77746c;
		font:
			9px 'DM Mono',
			monospace;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.event-location {
		align-items: center;
		color: #77746c;
		display: flex;
		font-size: 11px;
		gap: 5px;
		margin: 6px 0 0;
	}
	.completed.event-row:not(:last-child):not(.day-end)::after {
		animation: travel-dot 1.8s ease-in-out infinite;
		background: #ef5b2a;
		border-radius: 50%;
		box-shadow: 0 0 8px 2px #ef5b2a99;
		content: '';
		height: 6px;
		left: 12px;
		position: absolute;
		width: 6px;
	}
	@keyframes travel-dot {
		0% {
			opacity: 0;
			top: 31px;
		}
		15% {
			opacity: 1;
		}
		85% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			top: calc(100% + 23px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.completed.event-row:not(:last-child)::after {
			animation: none;
			opacity: 1;
			top: 31px;
		}
	}
	.event-marker {
		align-items: center;
		background: #f3f0e8;
		border: 1px solid #25252447;
		border-radius: 50%;
		color: #77746c;
		display: flex;
		font:
			9px 'DM Mono',
			monospace;
		height: 30px;
		justify-content: center;
		position: relative;
		width: 30px;
		z-index: 1;
	}
	.completed .event-marker {
		background: #ef5b2a;
		border-color: #ef5b2a;
		color: #fff;
	}
	.event-row article {
		border-bottom: 1px solid #2525241c;
		margin-bottom: 24px;
		padding-bottom: 25px;
	}
	.event-row:last-child article {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.event-meta {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
	.event-meta time {
		color: #77746c;
		font-size: 9px;
	}
	.event-meta span {
		border: 1px solid #25252430;
		color: #77746c;
		font-size: 8px;
		padding: 4px 7px;
	}
	.event-meta span.done {
		border-color: #ef5b2a;
		color: #ef5b2a;
	}
	.event-row h3 {
		font-size: 18px;
		letter-spacing: -0.04em;
		margin: 18px 0 7px;
	}
	.event-row h3 b {
		color: #ef5b2a;
		font-weight: 400;
		padding: 0 4px;
	}
	.event-row .event-caption {
		color: #ef5b2a;
		font-size: 12px;
		font-style: italic;
		line-height: 1.5;
		margin: 8px 0 0;
	}
	.event-person {
		align-items: center;
		background: #f3f0e8;
		border-left: 2px solid #2525243d;
		display: inline-flex;
		gap: 9px;
		margin-top: 17px;
		padding: 7px 10px 7px 7px;
	}
	.event-person img,
	.event-avatar-emoji {
		border-radius: 50%;
		display: block;
		height: 30px;
		object-fit: cover;
		width: 30px;
	}
	.event-avatar-emoji {
		align-items: center;
		background: #2525241c;
		display: flex;
		font-size: 15px;
		justify-content: center;
	}
	.event-person strong {
		font-size: 11px;
	}
	.not-found-page {
		align-items: center;
		display: flex;
	}
	.not-found-card {
		background: #fffdf8;
		border: 1px solid #2525241c;
		margin: auto;
		max-width: 680px;
		padding: 26px;
		width: 100%;
	}
	.not-found-content {
		padding: 82px 0 78px;
	}
	.not-found-code {
		color: #77746c;
		font:
			12px 'DM Mono',
			monospace;
		letter-spacing: 0.1em;
		margin: 0 0 25px;
		text-transform: uppercase;
	}
	.not-found-content h1 {
		font:
			400 clamp(38px, 7vw, 59px)/1 Georgia,
			serif;
		letter-spacing: -0.06em;
		margin: 0 0 18px;
	}
	.not-found-content > p:not(.kicker):not(.not-found-code) {
		color: #6a6861;
		font-size: 14px;
		line-height: 1.6;
		margin: 0 0 30px;
		max-width: 430px;
	}
	.primary-link {
		background: #252524;
		color: #fff;
		display: inline-block;
		font-size: 12px;
		padding: 15px 18px;
		text-decoration: none;
		transition: background 0.2s ease;
	}
	.primary-link:hover {
		background: #ef5b2a;
		color: #fff;
	}
	@media (max-width: 680px) {
		.tracking-page,
		.not-found-page {
			padding: 16px;
		}
		.tracking-container {
			padding-top: 42px;
		}
		.tracking-title {
			align-items: start;
			flex-direction: column;
			gap: 18px;
		}
		.service-window {
			text-align: left;
		}
		.status-panel {
			grid-template-columns: 1fr;
			padding: 24px;
		}
		.parcel-card {
			min-height: 150px;
		}
		.summary-grid {
			grid-template-columns: 1fr;
		}
		.events-section {
			margin-top: 57px;
		}
		.events-heading h2 {
			font-size: 34px;
		}
		.status-time {
			flex-direction: column;
			gap: 7px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.primary-link {
			transition: none;
		}
	}
</style>
