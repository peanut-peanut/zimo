"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionTitle from "../../../../components/SectionTitle";

const ApplicationProcess = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section id="application-process" ref={sectionRef}>
            <div>
                <SectionTitle title="Application Process" />

                <Image
                    src="/assets/image/ApplicationProcess.jpg"
                    alt="Application Process"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>
        </section>
    );
};

export default ApplicationProcess;
