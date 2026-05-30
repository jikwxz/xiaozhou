import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform float uVelocity;

mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

vec3 rotateX(vec3 v, float angle) {
  return v * rotation3dX(angle);
}

vec3 rotateY(vec3 v, float angle) {
  return v * rotation3dY(angle);
}

float easeInOutCubic(float x) {
  return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vUv = uv;
  vec3 newPosition = position;

  float mouseDistance = length((uv - uMouse) * vec2(1.0, 1.618));
  float mouseWave = map(clamp(mouseDistance, 0.0, 1.0), 1.0, 0.0, 0.0, 1.0);
  mouseWave = easeInOutCubic(mouseWave) * 1.618;
  mouseWave *= 1.0 + uVelocity * 2.0;
  newPosition.z += mouseWave;

  float angleX = sin(uTime * 0.25) * 0.25;
  angleX += map(uMouse.y, -1.0, 1.0, 0.5, -0.5);

  float angleY = cos(uTime * 0.125) * 0.25;
  angleY += map(uMouse.x, -1.0, 1.0, -0.5, 0.5);

  newPosition = rotateX(newPosition, angleX);
  newPosition = rotateY(newPosition, angleY);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 coord) {
  vec2 i = floor(coord);
  vec2 f = fract(coord);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 coord) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(coord);
    coord *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  vec2 mouse = uMouse * 2.0 - 1.0;
  mouse.x *= uResolution.x / uResolution.y;

  float mouseDist = length(uv - mouse);
  float mouseInfluence = smoothstep(1.0, 0.0, mouseDist) * 0.5;

  vec2 fluidUv = uv * 3.0;
  fluidUv.x += uTime * 0.2;
  fluidUv.y += sin(uTime * 0.1) * 0.3;
  fluidUv += mouse * mouseInfluence;

  vec2 displacement = uv * 2.0;
  displacement.x -= uTime * 0.15;
  displacement.y += cos(uTime * 0.1) * 0.2;
  displacement += mouse * mouseInfluence;

  float fluidX = fbm(fluidUv);
  float fluidY = fbm(displacement);
  float fluid = fbm(fluidUv + vec2(fluidX, fluidY));
  float fluidDetail = fbm(displacement + vec2(fluidX, fluidY) * 0.5);

  fluid = mix(fluid, fluidDetail, 0.5);

  float normalX = fluid - fbm(fluidUv + vec2(0.01, 0.0));
  float normalY = fluid - fbm(fluidUv + vec2(0.0, 0.01));
  vec3 normal = normalize(vec3(normalX * 2.0, normalY * 2.0, 1.0));

  vec2 refractionOffset = normal.xy * mouseInfluence * 0.5;
  refractionOffset += (1.0 - mouseInfluence) * 0.05;

  vec2 surfaceUv = vUv + normal.xy * 0.1 + refractionOffset;

  vec3 color1 = vec3(0.784, 0.635, 0.396);
  vec3 color2 = vec3(0.957, 0.945, 0.918);
  vec3 color3 = vec3(0.835, 0.812, 0.757);
  vec3 surfaceColor = mix(color1, color2, surfaceUv.x);
  surfaceColor = mix(surfaceColor, color3, surfaceUv.y);

  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 envDir = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(normal, lightDir), 0.0);
  float envReflection = max(dot(normal, envDir), 0.0);

  vec3 envColor = vec3(0.957, 0.945, 0.918);
  surfaceColor *= envColor * envReflection + refractionOffset;

  float shininess = 10.0;
  float specular = pow(max(dot(normal, lightDir), 0.0), shininess) * 0.5;
  surfaceColor += specular;

  surfaceColor += smoothstep(0.5, 0.0, mouseDist) * vec3(0.957, 0.945, 0.918);

  float glow = smoothstep(0.1, 0.0, mouseDist) * 0.25;
  float alpha = fluid * 0.1 + mouseInfluence * 0.5;
  surfaceColor += glow;

  gl_FragColor = vec4(surfaceColor, alpha);
}
`;

export default function FluidDistortion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(18, 13.5, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uVelocity: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const pointerTarget = { x: 0.5, y: 0.5 };
    const prevPointer = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      pointerTarget.x = gsap.utils.interpolate(
        pointerTarget.x,
        e.clientX / window.innerWidth,
        0.1
      );
      pointerTarget.y = gsap.utils.interpolate(
        pointerTarget.y,
        1.0 - e.clientY / window.innerHeight,
        0.1
      );
    };

    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      const time = clock.getElapsedTime();
      material.uniforms.uTime.value = time * 0.5;
      material.uniforms.uMouse.value.set(pointerTarget.x, pointerTarget.y);

      const velX = (pointerTarget.x - prevPointer.x) * 10;
      const velY = (pointerTarget.y - prevPointer.y) * 10;
      material.uniforms.uVelocity.value = Math.sqrt(velX * velX + velY * velY);

      prevPointer.x = pointerTarget.x;
      prevPointer.y = pointerTarget.y;

      renderer.render(scene, camera);
    };

    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Title animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const titleChars = '流失的浮华'.split('');

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      <div
        className="absolute inset-0 flex items-center z-10 pointer-events-none"
        style={{ paddingLeft: '8vw' }}
      >
        <div>
          <div ref={titleRef} className="overflow-hidden">
            {titleChars.map((char, i) => (
              <span
                key={i}
                className="char inline-block font-serif text-[#f4f1ea]"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  opacity: 0,
                  textShadow: '0 0 80px rgba(200, 162, 101, 0.3)',
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <p
            className="font-mono text-xs text-[#d5cfc1] mt-4"
            style={{
              letterSpacing: '0.2em',
              opacity: 0.6,
            }}
          >
            EST. 2024 &mdash; DEEP READING &amp; QUIET THOUGHTS
          </p>
        </div>
      </div>
    </section>
  );
}
