"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  profile,
  contact,
  projects,
  experience,
  skills,
  education,
  certs,
} from "@/lib/content";

type Block = { id: number; node: ReactNode };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "open",
  "skills",
  "experience",
  "education",
  "certs",
  "resume",
  "contact",
  "social",
  "clear",
  "banner",
];

const Ps1 = () => (
  <span className="ps1">
    visitor@mohankolli<span className="sym">:</span>
    <span className="path">~</span>
    <span className="sym">$</span>
  </span>
);

export default function Terminal() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  const idRef = useRef(0);
  const history = useRef<string[]>([]);
  const histIdx = useRef(0);
  const skipRef = useRef(false);
  const runningRef = useRef(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((node: ReactNode) => {
    setBlocks((b) => [...b, { id: idRef.current++, node }]);
  }, []);

  const printLines = useCallback(
    async (nodes: ReactNode[], delay = 110) => {
      for (const n of nodes) {
        push(n);
        await sleep(skipRef.current ? 0 : delay);
      }
    },
    [push]
  );

  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = screenRef.current.scrollHeight;
  }, [blocks]);

  // ---- boot sequence (runs once) ----
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) skipRef.current = true;

    let cancelled = false;
    (async () => {
      const boot: ReactNode[] = [
        <span className="line dim">booting mohankolli.exe ...</span>,
        <span className="line">
          <span className="ok">[ ok ]</span> mounting kernel modules
        </span>,
        <span className="line">
          <span className="ok">[ ok ]</span> bringing up network interface
        </span>,
        <span className="line">
          <span className="ok">[ ok ]</span> loading credentials vault
        </span>,
        <span className="line">
          <span className="ok">[ ok ]</span> arming intrusion defenses
        </span>,
        <span className="line dim">&nbsp;</span>,
      ];
      for (const n of boot) {
        if (cancelled) return;
        push(n);
        await sleep(skipRef.current ? 0 : 230);
      }
      if (cancelled) return;
      push(banner());
      push(
        <div className="block">
          <div className="line">
            <span className="b">{profile.display}</span>{" "}
            <span className="dim">// {profile.title} @ {profile.company}</span>
          </div>
          <div className="line cyan">&quot;{profile.tagline}&quot;</div>
          <div className="line dim">
            {profile.location} · {profile.availability}
          </div>
        </div>
      );
      push(
        <div className="line dim block">
          Type <span className="ok">help</span> and hit enter, or tap a command below.
          New here?{" "}
          <span className="ok">whoami</span> → <span className="ok">ls</span> →{" "}
          <span className="ok">resume</span>.
        </div>
      );
      setReady(true);
      inputRef.current?.focus();
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- command implementations ----------
  const openProject = useCallback(
    async (id: string) => {
      const p = projects.find((x) => x.id === id);
      if (!p) {
        push(
          <div className="line red block">
            target not found: <span className="hi">{id}</span> — try{" "}
            <span className="ok">ls</span> to list targets.
          </div>
        );
        return;
      }
      runningRef.current = true;
      await printLines(
        [
          <span className="line dim">
            [*] acquiring target <span className="hi">{p.id}</span> ...
          </span>,
          <span className="line dim">[*] nmap -sV --top-ports 1000 ...</span>,
          <span className="line">
            <span className="amber">[!]</span> weakness surfaced:{" "}
            <span className="hi">{p.vuln}</span>
          </span>,
          <span className="line dim">[*] crafting payload ...</span>,
          <span className="line ok">[+] access granted — case file decrypted</span>,
          <span className="line flag">
            {"    "}
            {p.flag}
          </span>,
        ],
        160
      );
      push(
        <div className="card">
          <h3>▹ {p.name}</h3>
          <div className="stack">
            {p.stack} <span className="dim">· {p.date}</span>
          </div>
          <div className="line">{p.summary}</div>
          <div style={{ marginTop: "0.5rem" }}>
            {p.bullets.map((b, i) => (
              <div className="line bullet" key={i}>
                {b}
              </div>
            ))}
          </div>
        </div>
      );
      runningRef.current = false;
    },
    [printLines, push]
  );

  const run = useCallback(
    (raw: string) => {
      const line = raw.trim();
      // echo the command
      push(
        <div className="line cmd-echo">
          <Ps1 /> {raw}
        </div>
      );
      if (!line) return;
      history.current.push(line);
      histIdx.current = history.current.length;

      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(" ").toLowerCase();
      const c = cmd.toLowerCase().replace(/^\.\//, "");

      switch (c) {
        case "help":
        case "?":
        case "man":
          push(helpBlock());
          break;
        case "whoami":
        case "about":
          push(whoamiBlock());
          break;
        case "ls":
        case "dir":
          push(lsBlock());
          break;
        case "open":
        case "cat":
        case "exploit":
          if (!arg) {
            push(
              <div className="line dim block">
                usage: <span className="ok">open &lt;target&gt;</span> — e.g.{" "}
                <span className="ok">open themis</span>. Run <span className="ok">ls</span>{" "}
                for targets.
              </div>
            );
          } else {
            void openProject(arg.replace(/^\.\//, ""));
          }
          break;
        case "skills":
        case "stack":
          push(skillsBlock());
          break;
        case "experience":
        case "xp":
        case "work":
          push(experienceBlock());
          break;
        case "education":
        case "edu":
          push(educationBlock());
          break;
        case "certs":
        case "certifications":
          push(certsBlock());
          break;
        case "resume":
        case "cv":
          push(resumeBlock());
          break;
        case "contact":
        case "hire":
        case "hire-me":
        case "sudo":
          push(contactBlock(c === "sudo"));
          break;
        case "social":
        case "links":
          push(socialBlock());
          break;
        case "clear":
        case "cls":
          setBlocks([]);
          break;
        case "banner":
          push(banner());
          break;
        case "rm":
          push(
            <div className="line red block">
              nice try. this host has immutable flags set.{" "}
              <span className="dim">(chattr +i, obviously)</span>
            </div>
          );
          break;
        case "hack":
        case "matrix":
          push(
            <div className="line ok block">
              01001000 01101001 — you&apos;re already in. type{" "}
              <span className="hi">ls</span> to look around.
            </div>
          );
          break;
        case "exit":
        case "quit":
          push(
            <div className="line dim block">
              there is no exit. you&apos;re hired-curious now. try{" "}
              <span className="ok">contact</span>.
            </div>
          );
          break;
        default:
          push(
            <div className="line block">
              <span className="red">command not found:</span> {cmd}.{" "}
              <span className="dim">
                try <span className="ok">help</span>.
              </span>
            </div>
          );
      }
    },
    [push, openProject]
  );

  const submit = useCallback(() => {
    if (runningRef.current) return;
    const v = input;
    setInput("");
    run(v);
  }, [input, run]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) {
        histIdx.current -= 1;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < history.current.length - 1) {
        histIdx.current += 1;
        setInput(history.current[histIdx.current] ?? "");
      } else {
        histIdx.current = history.current.length;
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMMANDS.filter((x) => x.startsWith(input.toLowerCase()));
      if (m.length === 1) setInput(m[0] + " ");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setBlocks([]);
    }
  };

  const skipIntro = () => {
    skipRef.current = true;
    if (!ready) return;
    inputRef.current?.focus();
  };

  const chip = (label: string, command?: string) => (
    <button
      className="chip"
      key={label}
      onClick={() => {
        if (runningRef.current) return;
        run(command ?? label);
        inputRef.current?.focus();
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="window" onClick={() => inputRef.current?.focus()}>
      <div className="titlebar">
        <div className="dots">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
        </div>
        <div className="title">
          <b>visitor@mohankolli</b>: ~/portfolio — zsh
        </div>
        <div className="tools" onClick={(e) => e.stopPropagation()}>
          <button className="tool" onClick={skipIntro}>
            skip intro
          </button>
          <a className="tool primary" href={contact.resume} target="_blank" rel="noopener">
            resume ↓
          </a>
          <a className="tool" href={`mailto:${contact.email}`}>
            email
          </a>
          <a className="tool" href={contact.github} target="_blank" rel="noopener">
            github
          </a>
          <a className="tool" href={contact.linkedin} target="_blank" rel="noopener">
            linkedin
          </a>
        </div>
      </div>

      <div className="screen" ref={screenRef}>
        {blocks.map((b) => (
          <div key={b.id}>{b.node}</div>
        ))}
      </div>

      <div className="inputrow">
        <Ps1 />
        <input
          ref={inputRef}
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="terminal command input"
          placeholder={ready ? "type a command (try: help)" : ""}
        />
      </div>

      <div className="chips">
        {chip("help")}
        {chip("whoami")}
        {chip("ls")}
        {chip("skills")}
        {chip("experience")}
        {chip("resume")}
        {chip("contact")}
        {chip("clear")}
      </div>
    </div>
  );
}

// ---------- rendered blocks ----------

function banner(): ReactNode {
  return (
    <div className="bannerbox">
      <div className="bannername">
        mohankolli<span className="ext">.exe</span>
      </div>
      <div className="bannersub">
        AI &amp; Application Security Engineer — break it, then build the defense.
      </div>
    </div>
  );
}

function helpBlock(): ReactNode {
  const rows: [string, string][] = [
    ["whoami", "who I am, in one screen"],
    ["ls", "list my projects (targets)"],
    ["open <target>", "crack open a project case file"],
    ["skills", "the full stack I work with"],
    ["experience", "where I have done it"],
    ["education", "degree"],
    ["certs", "certifications"],
    ["resume", "the one-page CV (PDF)"],
    ["contact", "how to reach me / hire me"],
    ["social", "github · linkedin · email"],
    ["clear", "wipe the screen"],
    ["banner", "reprint the logo"],
  ];
  return (
    <div className="block">
      <div className="line dim">available commands:</div>
      <table className="ls">
        <tbody>
          {rows.map(([c, d]) => (
            <tr key={c}>
              <td className="id">{c}</td>
              <td className="dt">{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="line dim">
        tips: <span className="hi">Tab</span> autocompletes · <span className="hi">↑/↓</span>{" "}
        recalls history · <span className="hi">Ctrl+L</span> clears.
      </div>
    </div>
  );
}

function whoamiBlock(): ReactNode {
  return (
    <div className="block">
      <div className="kv">
        <span className="k">name</span>
        <span className="hi">{profile.name}</span>
        <span className="k">role</span>
        <span>
          {profile.title} <span className="dim">@ {profile.company}</span>
        </span>
        <span className="k">location</span>
        <span>
          {profile.location} <span className="dim">· {profile.availability}</span>
        </span>
        <span className="k">focus</span>
        <span className="cyan">{profile.targets.join(" · ")}</span>
      </div>
      <div className="line" style={{ marginTop: "0.6rem" }}>
        {profile.bio}
      </div>
    </div>
  );
}

function lsBlock(): ReactNode {
  return (
    <div className="block">
      <div className="line dim">./work — {projects.length} targets. open one: <span className="ok">open &lt;id&gt;</span></div>
      <table className="ls">
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td className="id">{p.id}</td>
              <td className="nm">{p.name}</td>
              <td className="dt">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function skillsBlock(): ReactNode {
  return (
    <div className="block">
      {skills.map((s) => (
        <div key={s.group} style={{ marginBottom: "0.5rem" }}>
          <div className="line b">{s.group}</div>
          <div className="line dim indent">{s.items}</div>
        </div>
      ))}
    </div>
  );
}

function experienceBlock(): ReactNode {
  return (
    <div className="block">
      <div className="line b">
        {experience.role} <span className="dim">— {experience.company}</span>
      </div>
      <div className="line dim">
        {experience.period} · {experience.location}
      </div>
      <div style={{ marginTop: "0.4rem" }}>
        {experience.bullets.map((b, i) => (
          <div className="line bullet" key={i}>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function educationBlock(): ReactNode {
  return (
    <div className="block">
      <div className="line b">{education.degree}</div>
      <div className="line">
        {education.school} <span className="dim">· {education.period} · {education.detail}</span>
      </div>
    </div>
  );
}

function certsBlock(): ReactNode {
  return (
    <div className="block">
      {certs.map((c, i) => (
        <div className="line bullet" key={i}>
          {c}
        </div>
      ))}
    </div>
  );
}

function resumeBlock(): ReactNode {
  return (
    <div className="block">
      <div className="line">
        one-page CV:{" "}
        <a className="link-inline" href={contact.resume} target="_blank" rel="noopener">
          {contact.resume} ↗
        </a>
      </div>
      <div className="line dim">(also in the title bar: resume ↓)</div>
    </div>
  );
}

function contactBlock(sudo: boolean): ReactNode {
  return (
    <div className="block">
      {sudo && <div className="line amber">[sudo] escalating to hiring manager ...</div>}
      <div className="kv">
        <span className="k">email</span>
        <a className="link-inline" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <span className="k">linkedin</span>
        <a className="link-inline" href={contact.linkedin} target="_blank" rel="noopener">
          {contact.linkedin} ↗
        </a>
        <span className="k">github</span>
        <a className="link-inline" href={contact.github} target="_blank" rel="noopener">
          {contact.github} ↗
        </a>
      </div>
    </div>
  );
}

function socialBlock(): ReactNode {
  return contactBlock(false);
}
