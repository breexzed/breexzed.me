---
title: Renting Understanding
formula: interfaces + observability -> understanding
type: articulation
status: published
date: 2026-11-05
label: articulation
parent: root
depth: 1
domain: learning
excerpt: >-
  In truth, AI is good at doing things, and the models advance every day. But
  I've come to observe that AI is only as helpful as the level of understanding
  you have of the thing you want it to do.
tags:
  - learning
  - ai
  - linux
  - observability
children: []
connects: []
---

Everywhere on the internet, I see stories of people using AI to do their work: writing, coding, social media, almost every kind of knowledge work one can think of. I can't speak much about the success these people have found with it. Those who have found success using AI for their work have done so in ways known only to them.

If you're reading this and you don't buy into the idea of AI, I'm not here to invalidate you. In fact, I agree with you that, to an extent, AI can be dangerous. Outsourcing tasks to AI atrophies cognition. And sure, it's easy to say "just don't use AI," but you cannot just not use a technology like AI. The diagnosis is right, but the prescription is impossible. It's like saying you won't use Windows because it's closed-source software. Of course you won't, but your boss will, and they'll expect you to attend that meeting on Microsoft Teams, so you'd better find a workaround. You can use Proton all you want; you'll still always need an Outlook for other things.

In truth, AI is good at doing things, and the models advance every day. But I've come to observe that AI is only as helpful as the level of understanding you have of the thing you want it to do.

If you want to become an engineer starting from scratch, AI will engineer the systems you're building for you, instead of teaching you to build them yourself. By default, AI is built to do the task, not to teach you, so the "let the AI teach you" crusade doesn't really work.

As someone who's all about the gospel of capability transfer, I ended up building learning systems around my interactions with AI, just to capture what would naturally happen if I'd struggled through the learning process myself. With time, I began building systems around myself with AI, rather than learning how to build things at all.

There were two paths before me, and I fell for the less important one.

I used to think you're better off building with AI than learning from it. Maybe you pick one or two things up while building, or maybe you both pick things up (the best part). It feels like learning, but it's not. Mostly.

But this has been the real unlock for me: building and learning are not mutually exclusive. Yes, even with AI in the loop.

I want to have understanding. The [whoami manifesto](/about/) is real. For engineering, software specifically, I chose to build two projects from scratch. One sits up the wire ([httpd](https://github.com/breexzed/httpd-go)), the other touches the metal ([Pulsed](https://github.com/breexzed/pulsed)). This is intentional. But then, I can't seem to find myself doing anything. When someone asks what I've been doing, telling them I've been building something that already exists, and works better than anything I might ever build, is less interesting. I've been there.

I envy those who've cracked building with AI without deeply ingrained knowledge of the technologies involved. They're not many, and that rarity is important. And it's not as easy as it sounds.

The Linux system is so full of abstractions and code that not even Linus Torvalds knows what every component does. People share an understanding of it, and for those who don't, there's an endless amount of documentation and man pages, so much that you could almost build the system from first principles. And most importantly, there are components deep in the system that follow other components from being a block of code on disk to a running service, tracked as a unit through its whole lifecycle: loaded, active, failed. These two things are very important, and bringing them to building/learning with AI is something every builder/learner should learn from.

This is unlock number two: interfaces and observability matter the most.

Whenever I log into my computer, I get a message that the login keyring wasn't authenticated (due to my Linux setup, which you can look at [here](/setup/)), and I have to re-enter my password. It comes up when I do things like open a browser or run Claude Code. What even is a keyring?

Claude found the cause: on Hyprland, nothing kept the unlocked keyring daemon running, so when an app asked for a secret, a fresh, locked one started. The fix was enabling `gnome-keyring-daemon.socket` under `systemd --user`. And it held up when I restarted.

Then I asked it: how were you able to know this, even though you didn't build Linux, GNOME, or Hyprland?

Its first response was quite revealing. It said:

> You can know a system without having built it, if you know its interfaces and can watch it run.

> you type password → GDM → PAM → gnome-keyring-daemon → D-Bus → Firefox
>
> Walk the chain and find the first layer where expectation and evidence disagree. That's where the bug is.
>
> Brendan Gregg calls this drill-down analysis.

And I'm like, this is what intelligence is. And it works for almost anything.

So the real truth is: know the layers, and ask each layer when things are needed.

Then I took this insight to my own dilemma. There was a lot going on that needed looking into, so I sent it to Claude to act as an external judge. It can see my machine and everything I've done in the past months. Its verdict:

> You've been building plenty since September 13 but closing nothing yourself. The break starts at the draft step: the one layer only you can do.

> You're closing loops, just only the ones that don't require you.

> Your Sept 19 commit message says you couldn't form a hypothesis, had to lean on the AI tutor, and "feel like shit right now."

I couldn't form a hypothesis because I had never mapped the thing I was building. I skipped straight to rebuilding it, hit a wall, and routed around the pain into work AI could do for me.

I told myself that from now on, instead of beating myself up, when I'm not shipping with AI and I want to understand something, I should write about 200 words on the subject before thinking about code, mapping the interface. It doesn't require building. Only once that's solid will building tools to watch the interface run come easily. The documentation layer is how I "know the interface": understanding. And building tools to watch the interface run is how I get understanding++.

I thought about this a lot, and I realized that if I consistently focus on interfaces and observability, I can bypass the surface-level jargon and zoom straight into the architectural truth of how computers work. All I have to ask is: "How do I observe this?" and "How does this interface with that?" That way, I force every concept down to its physical reality: memory, execution, and communication.

Whenever I hit a plateau, AI can look into it and give me the interfaces to learn and the observability to look at, so I can solve the immediate problem. I'll do this for every blocker I come across so I don't just hoard knowledge I forget the next day.

And like a good X post once said, when stuck between decisions: when you're young, do the hard thing; otherwise, do what you want.