---
title: Human Mnemones
formula: spreading is not judgment
type: articulation
status: published
date: 2026-11-15
label: articulation
parent: root
depth: 1
domain: writing
excerpt: >-
  States and Semantics. These are two concepts I've come to identify as the
  building blocks of all human interaction.
tags:
  - memetics
  - freenet
  - ori
children: []
connects: []
---

**Freenet, Once Again: Part 1**

*"States, semantics, and the accidental curators of real"*

States and Semantics. These are two concepts I've come to identify as the building blocks of all human interaction.

When people from disparate origins come together towards a goal of achieving something larger than themselves, it can be said that they're attempting to "[co-ordinate](https://en.wikipedia.org/wiki/Coordination_game)".

Yet I think of [co-ordination](#g-coordination) as a process. Not as a fixed frame of how things should or could be. And so it stuns me when I look at the world and see groups of people attempting to co-ordinate without first aligning with the process that naturally creates the environment for co-ordination to emerge. Without first establishing shared meaning, [shared states](#g-shared-state), shared [semantics](#g-semantics).

Over the years we came to understand the computational cost of not establishing shared state. We developed protocols, standards and semantics that define how we implement technologies, and so we progressed much faster computationally than in human organization. [Freenet](https://freenet.org/) is one of those technologies, built so that no single party owns the shared state.

To think that the machine we made, from our own imagination of what could be, would become central to how we relate to one another, all mediated through the organization of "bits", units of information. As you read this, imagine if I were speaking to you instead. How could I trust you to pass this information to someone else without unknowingly tampering with some parts of it? How have we, as a civilization, solved de-contextualization? How have we solved the traps of [selective filtering](#g-selective-filtering)?

Turns out we haven't done a very great job.

Then again, maybe it's unfair to expect we'd agree on what's true, but is this not simply how humans work? Our defining trait as humans could as well just be selective filtering. Is this not how we have been able to survive cognitively? Narrative building, attention, past experiences, biases; is it not these that etch in us what we call emotions, helping us turn chaotic facts into coherent stories, the most common one being the story of a "self"?

The question I want you to meditate on is: if it is true, or at least partly true, that selective filtering is what makes us human, who holds (or has been holding) the filter?

This is the central question behind an organization called [ORI](https://openresearchinstitute.org/).

## ORI

ORI says we are all already deciding what humanity knows, one share, one scroll at a time. That the last thing we shared, we shared because it caught us. That somehow, someone now knows it because we did. That nobody asked us to curate humanity's knowledge, yet we do, and so does everyone else, a million times today.

ORI is an effort to map the selective filters we apply, and the ones platforms apply for us, as we come to know ourselves as a collective. ORI is an effort to bring humanity's self-knowledge into being. ORI studies [hyperbolic meme chambers](#g-hyperbolic-meme-chamber). ORI is a hyperbolic meme chamber you can look into.

Finding ways to resolve the friction between our biological need to filter reality and our collective need for shared state to coordinate is one of the missions of ORI. The goal of ORI's [observability layer](#g-observability-layer) is to give humanity the equivalent of a network debugger for collective attention, laying the foundation for a category of tooling capable of probing collective surfaces for bad-faith [Human Mnemones](#g-human-mnemone).

In my essay [Hyperbolic Meme Chambers](/writing/hyperbolic-meme-chambers/), I wrote that chambers select for what spreads. If memeability decides what survives, whoever owns the chamber owns the outcome. Freenet was rebuilt so that nobody does. Because spreading is not judgment.

## Freenet, Rebuilt

It's no coincidence that the [Freenet research paper](https://freenet.org/pdf/freenet-whitepaper.pdf) describes its core abstraction as "a WebAssembly module that defines both the public state of an application and the [merge semantics](#g-merge-semantics) used to reconcile replicas."

Every human mind is a local [replica](#g-replica), running its own selective filter on reality. Freenet gives us a substrate where those replicas can reconcile their views into a shared public state, without handing the merge semantics to a platform, an algorithm, or a central owner.

It reminds me of the last paragraph on the [Open Research Institute's website](https://openresearchinstitute.org/):

> "Welcome to ORI. We're co-workers in this shared landscape, whether we like it or not. Let's see if we can make this place a little better than how we found it 🌷 💐 🌻"

Here's how it fits together for me: ORI wants to look into the chambers, the places our attention passes through: a Twitter timeline, the Hacker News front page, a group chat. Looking in means collecting what moves through them and counting it: which words, phrases and links are spreading, and later, which ones stop and whether they ever come back. Freenet is a chamber nobody owns. An observatory belongs on ground like that.

So I'm starting where I can: writing a collector for ORI's [observability prototype](https://github.com/Open-Research-Institute/nooscope), and mapping what it would take for it to run on Freenet.

We are all Human Mnemones. It's time we looked into the chamber.

I'm still learning Freenet's architecture. Part 2 will cover how it works and what I'm building on it.

## Glossary

<span id="g-human-mnemone"></span>**Human Mnemone**: any individual acting as an active, selective node in the transmission of collective memory, deciding what humanity remembers, mutates, or forgets through every act of attention, interpretation, and sharing.

<span id="g-coordination"></span>**Co-ordination**: people from disparate origins working towards something larger than themselves. Here, a process rather than a fixed frame: it emerges once shared meaning, shared state and shared semantics exist.

<span id="g-shared-state"></span>**Shared state**: the facts every participant agrees are current. In machines, the data that every copy agrees on; in people, the common ground a group starts from before it can act together.

<span id="g-semantics"></span>**Semantics**: what a piece of state means, and the rules for reading it. Two parties can hold the same bits and still disagree on their semantics.

<span id="g-selective-filtering"></span>**Selective filtering**: choosing what to keep and what to drop from the flood of reality, through narrative, attention, past experience and bias. It is how a mind turns chaotic facts into a coherent story.

<span id="g-hyperbolic-meme-chamber"></span>**Hyperbolic meme chamber**: a space where ideas survive by how well they spread, not by judgment. "If an idea cannot be memed, it cannot be sequenced into the attention economy." See [Hyperbolic Meme Chambers](/writing/hyperbolic-meme-chambers/).

<span id="g-replica"></span>**Replica**: a local copy of shared state that can drift from the others. Every human mind is one, running its own filter.

<span id="g-merge-semantics"></span>**Merge semantics**: the rules that reconcile diverging replicas into one public state. In Freenet, each application's contract carries its own, as a WebAssembly module ([whitepaper](https://freenet.org/pdf/freenet-whitepaper.pdf)).

<span id="g-observability-layer"></span>**Observability layer**: tooling that makes a system's insides visible from the outside. For ORI, a network debugger for collective attention.
