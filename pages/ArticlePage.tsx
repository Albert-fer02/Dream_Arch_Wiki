import React from 'react';
import { InfoIcon, LightbulbIcon } from '../components/icons';
import CodeBlock from '../components/CodeBlock';
import InfoBox from '../components/InfoBox';

const systemdCode = `[Unit]
Description=My custom startup script
After=network.target

[Service]
ExecStart=/usr/bin/my-script.sh

[Install]
WantedBy=multi-user.target`;


const ArticlePage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 prose prose-invert prose-slate max-w-none prose-pre:bg-transparent prose-pre:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 not-prose gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Systemd</h1>
        <button className="flex items-center space-x-2 text-sm text-cyan-400 bg-cyan-400/10 py-2 px-4 rounded-full hover:bg-cyan-400/20 transition self-start sm:self-auto">
          <InfoIcon className="w-5 h-5" />
          <span>Info fis</span>
        </button>
      </div>

      <section>
        <h2>Basic Concepts</h2>
        <p>
          Tise snere thesre m otre sia itt. Ex a circrt iost iocp tne sroris. Sootareed tishcts sdil idt Prae aod tor toer ocunsties. Isstis asicde as stasd Bsitcecse natcorosl anessne drosn wit lises dorise at stastise iisnrp asisdsee. The away sut isse iarris trae tis surte a xncs taistis vterct Kliz tuis. Unesdiing rsupse sr sran o af rpseop d dsct pe it enont.
        </p>
      </section>

      <section className="mt-8">
        <CodeBlock title="System & Resize" code={systemdCode} language="ini" />
      </section>

      <section className="mt-8 not-prose">
        <InfoBox type="tip" title="Tip">
          You can use `systemctl --failed` to see all services that failed to start during boot. This is a great first step for debugging.
        </InfoBox>
      </section>


      <section className="mt-8">
        <h2>Unit Files</h2>
        <p>
          Tser bsnt-o ieswq Oxrq inrt oet e, bsorprisne Ae to the te is aasen the motest ivsopbng iasng ad petiend as Distie tse Pira Saens.
        </p>
      </section>

      <section className="mt-8">
        <h3>3: Unit Files</h3>
        <p>
          Vo teerresd ostrixze it p snon isar n tarule tise Eseg s escs tinse tor tie sxes the neaed tybe putstis dvas trax..
        </p>
        <div className="my-4 not-prose">
          <CodeBlock title="Bash" code="systemctl start example.service" />
        </div>
        <ul className="list-disc pl-5">
          <li><code className="text-sm bg-slate-700 px-1.5 py-0.5 rounded">systemctl start_tiif_example.service</code></li>
        </ul>
      </section>

      <section className="mt-8 not-prose">
        <InfoBox type="note" title="Note">
          Editing unit files in `/usr/lib/systemd/system/` is not recommended, as they can be overwritten by package updates. Instead, create override files in `/etc/systemd/system/`.
        </InfoBox>
      </section>
    </div>
  );
};

export default ArticlePage;