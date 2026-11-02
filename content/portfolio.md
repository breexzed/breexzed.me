---
title: Portfolio
description: Building Linux infrastructure in Go, from the kernel up.
# Shown on the home page, in this order. `id` must match a `{#id}` on a ### heading below.
projects:
  - id: pulsed
    name: Pulsed
    summary: A Linux process monitor in Go, built from /proc up.
  - id: httpd-go
    name: httpd-go
    summary: A small HTTP server in Go. Built from raw TCP.
  - id: wtp
    name: wtp (Willingness To Pay)
    summary: Find out whether people would pay, from interview and YouTube transcripts.
---

# Breexzed

Infrastructure engineering. Building Linux infrastructure in Go, from the kernel up.

<img class="portrait" src="/assets/portrait.webp" alt="Breexzed portrait" width="132" height="132">

## About

<div class="greentext">
<span>&gt; kid from Africa big tech dreams</span>
<span>&gt; internet friend sent pc to begin with</span>
<span>&gt; bricked machine trying to run Linux</span>
<span>&gt; Linux ran LFG!!!</span>
<span>&gt; got fascinated with the machine</span>
<span>&gt; been tinkering ever since</span>
<span>&gt; mfw he realized could make a living with this</span>
<span>&gt; infrastructure engineering</span>
</div>

Interested in: Linux, eBPF, Go, containers, cloud, kernel-native infrastructure.

## Now

### Pulsed — *Oct 2026 – present* {#pulsed}

`Go · Linux /proc · standard library only`

A Linux process monitor in Go, built from /proc up.

- Lists processes from /proc and parses /proc/PID/stat, including process names with spaces and ")".
- 125 lines of Go, 136 lines of tests, CI on every push.
- Next: measure how many short-lived processes a once-per-second read misses, then try eBPF.

[code](https://github.com/breexzed/pulsed)

## Selected work

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

Go / Python / Linux (/proc) / KVM, QEMU, libvirt / Git / GitHub Actions / Docker / Bash

## Writing

{{writing_list}}

## Links

[Email](mailto:breexzed@outlook.com) · [GitHub](https://github.com/breexzed) · [X](https://x.com/breexzed_)

---

*Updated Oct 2026.*
