/*
    Installed from https://reactbits.dev/ts/tailwind/
*/

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  
  // Create iridescent effect with multiple colors
  float iridescent = cos(col.x * 3.14159 + d) * 0.5 + 0.5;
  float white = cos(col.y * 2.0 + a) * 0.5 + 0.5;
  
  // Blend colors with white being more prominent, just dark blue and teal
  vec3 finalColor = mix(uColor1, vec3(1.0, 1.0, 1.0), white * 1.0);
  finalColor = mix(finalColor, uColor2, iridescent * 0.5);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface IridescenceProps {
    color1?: [number, number, number];
    color2?: [number, number, number];
    color3?: [number, number, number];
    speed?: number;
    amplitude?: number;
    mouseReact?: boolean;
}

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : [0, 0, 0];
};

export default function Iridescence ({
    color1 = [0.067, 0.071, 0.247], // #11123F
    color2 = [0.294, 0.471, 0.467], // #4B7877
    color3 = [0.639, 0.467, 0.337], // #A37756
    speed = 1.0,
    amplitude = 0.1,
    mouseReact = true,
    ...rest
}: IridescenceProps) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;
        const renderer = new Renderer();
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        let program: Program;

        function resize () {
            const scale = 1;
            renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
            if (program) {
                program.uniforms.uResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height,
                );
            }
        }
        window.addEventListener("resize", resize, false);
        resize();

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new Color(...color1) },
                uColor2: { value: new Color(...color2) },
                uColor3: { value: new Color(...color3) },
                uResolution: {
                    value: new Color(
                        gl.canvas.width,
                        gl.canvas.height,
                        gl.canvas.width / gl.canvas.height,
                    ),
                },
                uMouse: {
                    value: new Float32Array([mousePos.current.x, mousePos.current.y]),
                },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId: number;

        function update (t: number) {
            animateId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        function handleMouseMove (e: MouseEvent) {
            const rect = ctn.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            mousePos.current = { x, y };
            program.uniforms.uMouse.value[0] = x;
            program.uniforms.uMouse.value[1] = y;
        }
        if (mouseReact) {
            ctn.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener("resize", resize);
            if (mouseReact) {
                ctn.removeEventListener("mousemove", handleMouseMove);
            }
            ctn.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [color1, color2, color3, speed, amplitude, mouseReact]);

    return <div ref={ ctnDom } className="w-full h-full" { ...rest } />;
}
