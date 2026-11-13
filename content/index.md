---
title: Home
description: Infrastructure engineering · Linux, Go, from the kernel up.
# The greentext: written once here, shown in the home page's whoami?.
greentext:
  - "kid from Africa big tech dreams"
  - "internet friend sent pc to begin with"
  - "bricked machine trying to run Linux"
  - "Linux ran LFG!!!"
  - "got fascinated with the machine"
  - "been tinkering ever since"
  - "mfw he realized could make a living with this"
  - "infrastructure engineering"
---

# Welcome To My Estate

## whoami?

<img class="portrait" src="/assets/portrait.webp" alt="Breexzed portrait" width="132" height="132">

{{greentext}}
And unlike many where I'm from, as an African I believe Africa will become motherland once again, for every one of us, most especially for you and me.

I love Linux, music, and the gym in roughly that order. I'm currently building foundations in Linux systems and observability, with the long-term goal of working on programmable, kernel-native infrastructure. I enjoy writing programs that watch the machine run from the inside, and rebuilding the amazing technologies I find on the way.

I'm also fascinated by the idea of [memetics](https://en.wikipedia.org/wiki/Memetics) (pun intended), and I love geeking out about it with the folks at [ORI](https://openresearchinstitute.org/) & [Ark Industries](https://shaneandersen.com/). I keep a lab for **archaeomemetics**: digging up ideas that have stopped spreading, since a dead meme is the only kind you can study without spreading it again. Some of my writing on this is [here](/writing/hyperbolic-meme-chambers/).

[More about me, and what I'm interested in →](/about/) · [My Linux setup →](/setup/)

## What I'm Up To Now

- **Home labbing** with KVM, libvirt, QEMU, LXD and MAAS, learning Linux internals along the way and documenting the interfaces I run into and what working with them was like.

- **Learning [Freenet](https://freenet.org/)**, to build a federated knowledge system for a [research institute](/#notable-things-i-ve-done).

## Notable Things I've Done

- **Nov 2026:** Received a 3-month open source software grant, funded by [Shane Andersen](https://shaneandersen.com/) through the [Open Research Institute](https://openresearchinstitute.org/), to build a federated knowledge system on Freenet for ORI.

## Projects I've Worked On {#work}

### Pulsed — *Oct 2026 – present* {#pulsed}

`Go · Linux /proc · standard library only`

A Linux process monitor in Go, built from /proc up.

- Lists processes from /proc and parses /proc/PID/stat, including process names with spaces and ")".
- 125 lines of Go, 136 lines of tests, CI on every push.
- Next: measure how many short-lived processes a once-per-second read misses, then try eBPF.

[code](https://github.com/breexzed/pulsed)

### svcstat — *Oct 2026 – Nov 2026* {#svcstat}

`Go · systemd · cgroup v2 · standard library only`

Memory and task counters for a systemd service, read from its cgroup.

- Asks systemd for the unit's state and cgroup path, and refuses to read counters for a unit that isn't loaded and running: a stopped unit also has an empty cgroup path.
- Reads `memory.current`, `memory.peak` and `pids.current` from `/sys/fs/cgroup`, and checks every number against `systemctl show`.
- Never prints 0 on a failed read. No result is better than a wrong one.

[code](https://github.com/breexzed/svcstat)

### httpd-go — *Sep 2026* {#httpd-go}

`Go · TCP · HTTP/1.1 (RFC 9112)`

A small HTTP server in Go. Built from raw TCP.

- Parses the request line and headers, with a limit on header size.
- Reads request bodies using Content-Length.
- Keep-alive, so each request doesn't open a new TCP connection.
- Logs the client IP and duration of each request.

[code](https://github.com/breexzed/httpd-go) · [build log](/writing/http-server-from-scratch/)

### wtp (Willingness To Pay) — *Apr 2026 – Oct 2026* {#wtp}

`Python · LLM APIs · GitHub Actions`

Find out whether people would pay, from interview and YouTube transcripts. Built with Claude, for my own process.

- Checks every quote the model returns against the transcript. Across 3 real runs: 41 quotes, 28 exact, 6 near-exact, 7 stitched together, 0 invented.
- v0.6.2, 90 tests, CI on Python 3.11 and 3.14.

[code](https://github.com/breexzed/WTP-Signal-Extractor)

## Skills

- **Go**: what I build in. Learning it bottom-up, one standard-library package at a time.
- **Linux**: bricked it once, been living in it since. Fedora daily.
- **KVM, QEMU, libvirt**: my home lab runs on them; I'm rebuilding it by hand to make it mine.
- **LXD, MAAS**: next on the path; where I'm heading.
- **Python**: for tools I need today, not for systems.
- **Docker**: I use it, and I learned the hard way that it rewrites your firewall.
- **GitHub Actions**: CI on every push, so I'm not the judge of my own code.
- **Git, Bash**

## Some of My Latest Posts

{{latest_posts}}

[View all posts →](/writing/)

## Where You Can Reach Me

| Platform | Address |
| --- | --- |
| 📧 Email | [breexzed@outlook.com](mailto:breexzed@outlook.com) |
| 🐙 GitHub | [@breexzed](https://github.com/breexzed) |
| 𝕏 X | [@breexzed_](https://x.com/breexzed_) |

<p class="elsewhere">elsewhere: <a rel="me" href="https://mastodon.social/@breexzed">Mastodon</a> · <a rel="me" href="https://codeberg.org/Breexzed">Codeberg</a></p>

---

*Updated Nov 2026.*
