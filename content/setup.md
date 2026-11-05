---
title: Linux setup
description: Fedora 44 with a Hyprland desktop built from parts of Omarchy, and every change it took to make them fit.
---

# Linux setup

Fedora 44 with a Hyprland desktop built from parts of [Omarchy](https://github.com/omacom/omarchy). Omarchy targets Arch, so on Fedora some of its pieces break. This is the running log of every fix, newest at the bottom.

## Changes made to this copy of Omarchy 4.0.4 (copied from the Try Omarchy VM, 2026-10-18)

- bin/ held symlinks to /usr/bin in the VM; replaced with the real scripts.
- These theme hooks are no-ops (originals kept as *.orig), so a theme switch
  only touches Hyprland, the Omarchy shell, terminals and btop:
  omarchy-theme-set-{gnome,obsidian,claude,vscode,browser,browser-policy,pi,hermes,t3code,keyboard,keyboard-asus-rog,keyboard-f16}
- default/hypr/bootstrap.lua and paths.lua: fallback for OMARCHY_PATH is
  ~/.local/share/omarchy instead of /usr/share/omarchy (GDM does not set it).
- shell/plugins/services/idle/Service.qml: Try Omarchy VM host-window poll
  disabled (the helper only exists inside the VM; it failed every 5 s).
- shell/plugins/lock: LockView refocuses the password field after a failed
  check; Service re-evaluates `locked` after lock/secure/unlock events
  (stuck-locked bug hid notifications and blocked Super+Ctrl+L). Originals: *.orig

## System packages (outside this tree), 2026-10-19

- hyprland-guiutils (hyprland-dialog, hyprland-run, update screen) from COPR
  sdegler/hyprland, with excludepkgs=hyprland,hyprland-devel,hyprland-git,
  xdg-desktop-portal-hyprland so it never replaces ashbuk's Hyprland.
- Trap: ashbuk's hyprland vendors its libs in /usr/libexec/hyprland/vendor/lib64
  and still Provides their sonames, so dnf skips the real lib packages. Install
  them by name: hyprutils hyprtoolkit hyprlang hyprgraphics aquamarine.
  Check: ldd $(command -v hyprland-dialog) | grep 'not found'  (empty = good)

## Time sync, 2026-10-21

- bin/omarchy-update-time: restarts chronyd and runs `sudo chronyc makestep`
  instead of restarting systemd-timesyncd (Arch's daemon; disabled on Fedora,
  so the menu item did nothing). Original: *.orig
- Found because chronyd was disabled and the clock was 7 days slow:
  gateway.discord.gg's cert (notBefore Oct 18) was rejected, so Discord could
  not connect, and rpm flagged new package signatures as "not alive".
  Fix applied: sudo systemctl enable --now chronyd; sudo timedatectl set-ntp true
  Check: timedatectl | grep synchronized   (want: yes)

## Power profiles, 2026-10-23

- The Try Omarchy VM shipped stubs ("The VM uses Windows power management"): the
  power panel and menu said "Managed by the host computer" on this laptop.
  Restored the upstream GitHub v4.0.4 versions (hash-checked), VM copies kept as *.orig:
  bin/omarchy-powerprofiles-{list,set}, shell/plugins/menu/Menu.qml,
  shell/plugins/panels/power/Panel.qml
- Added bin/powerprofilesctl: a stand-in for get/list/set over the
  org.freedesktop.UPower.PowerProfiles D-Bus API that tuned-ppd serves (Fedora uses
  tuned + tuned-ppd; the real powerprofilesctl is in power-profiles-daemon, which
  conflicts). It steps aside if /usr/bin/powerprofilesctl ever exists.
- Seeded ~/.local/state/omarchy/powerprofiles/{ac,battery} = balanced, so upstream's
  "AC defaults to performance" rule changes nothing until you pick a profile.
  Check: powerprofilesctl list; tuned-adm active
- Other VM-only stubs still in place (not power): omarchy-screensaver,
  omarchy-toggle-nightlight + services/nightlight (needs hyprsunset, not installed),
  omarchy-update-*. Compare against upstream before touching.

## Wi-Fi share QR, 2026-10-23 (upstream bug, not Fedora-specific)

- bin/omarchy-network-qr read five nmcli fields from one --get-values call by
  position. An open network (a guest network with a captive portal) has no
  802-11-wireless-security setting, so nmcli prints only ssid + hidden; "no" landed
  in key-mgmt and the script died with "Could not read the Wi-Fi password".
  Now one nmcli call per field. Original: omarchy-network-qr.orig.
  Check: omarchy-network-qr --meta | head -1   (want: meta <iface> nopass <ssid>)
- The QR itself also needs qrencode (sudo dnf install qrencode).

## Ghostty as default terminal, 2026-10-28

- Ghostty 1.3.1 from COPR scottames/ghostty (sudo dnf copr enable scottames/ghostty;
  sudo dnf install ghostty). omarchy-install-terminal can't do it: omarchy-pkg-add
  calls pacman. Config copied by hand: config/ghostty -> ~/.config/ghostty.
- bin/omarchy-default-terminal wrote only ~/.config/xdg-terminals.list, but
  xdg-terminal-exec reads ~/.config/hyprland-xdg-terminals.list first, so a stale
  Hyprland list (Alacritty, kitty) silently won. Now writes both. Original: *.orig
  Check: omarchy-default-terminal ghostty; xdg-terminal-exec --print-id   (want: com.mitchellh.ghostty.desktop)

## Logout ends the session, 2026-11-05

- bin/omarchy-system-logout ran `uwsm stop`, but uwsm isn't installed (the session is
  /usr/bin/start-hyprland; only a uwsm-app shim exists in ~/.local/bin). The command
  failed into /dev/null, so logout closed every window and left the session up.
  Now: uwsm stop if uwsm exists, else `hyprctl dispatch 'hl.dsp.exit()'` (falls back
  to the legacy `exit` dispatcher; hyprctl returns 7 on an unknown dispatcher).
  Original: omarchy-system-logout.orig
  Check: Omarchy menu -> Logout   (want: back at the login screen)
