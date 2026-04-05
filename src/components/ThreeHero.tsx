'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroProps {
  className?: string;
}

/**
 * Full-screen 3D background for the /hub page using Three.js.
 *
 * Scene composition:
 * - Five wireframe geometric shapes (icosahedron, torus knot, octahedron,
 *   dodecahedron, tetrahedron) positioned around the periphery, each with
 *   independent rotation and sinusoidal float animation.
 * - A 500-particle star field with brand-colored points (gold, red, white).
 * - Mouse-follow camera that smoothly tracks cursor position.
 * - Scroll-driven camera zoom (pulls back as user scrolls down).
 *
 * On mobile (<=768px), falls back to a CSS radial gradient to avoid
 * GPU overhead. Three.js is dynamically imported so it is not bundled
 * for mobile visitors.
 *
 * Lifecycle: Scene, renderer, and event listeners are created in a single
 * useEffect and torn down on unmount via the cleanup return.
 */
export default function ThreeHero({ className = '' }: ThreeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (sceneInitialized.current || !containerRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      // Mobile: Use CSS gradient fallback
      if (containerRef.current) {
        containerRef.current.style.background =
          'radial-gradient(ellipse at 50% 0%, rgba(255, 204, 0, 0.15) 0%, transparent 50%), ' +
          'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)';
      }
      return;
    }

    // Dynamically import Three.js
    import('three').then((THREE) => {
      if (!containerRef.current || sceneInitialized.current) return;
      sceneInitialized.current = true;

      const container = containerRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      camera.position.z = 30;

      // Colors
      const colors = {
        yellow: 0xFFCC00,
        red: 0xD50032,
        blue: 0x3B82F6,
        green: 0x10B981,
        amber: 0xF59E0B,
      };

      // Create floating geometric shapes
      const shapes: Array<{
        mesh: THREE.Mesh;
        rotSpeed: { x: number; y: number };
        floatSpeed: number;
        floatAmp: number;
      }> = [];

      // Icosahedron (Yellow) - positioned away from center
      const icosaGeo = new THREE.IcosahedronGeometry(2, 0);
      const icosaMat = new THREE.MeshBasicMaterial({
        color: colors.yellow,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const icosa = new THREE.Mesh(icosaGeo, icosaMat);
      icosa.position.set(-22, 10, -10);
      shapes.push({ mesh: icosa, rotSpeed: { x: 0.003, y: 0.005 }, floatSpeed: 0.001, floatAmp: 2 });
      scene.add(icosa);

      // Torus Knot (Red) - positioned away from center
      const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 64, 8);
      const torusMat = new THREE.MeshBasicMaterial({
        color: colors.red,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(22, -10, -15);
      shapes.push({ mesh: torus, rotSpeed: { x: 0.004, y: 0.002 }, floatSpeed: 0.0015, floatAmp: 3 });
      scene.add(torus);

      // Octahedron (Blue) - positioned away from center
      const octaGeo = new THREE.OctahedronGeometry(2.5, 0);
      const octaMat = new THREE.MeshBasicMaterial({
        color: colors.blue,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      octa.position.set(-18, -15, -20);
      shapes.push({ mesh: octa, rotSpeed: { x: 0.002, y: 0.004 }, floatSpeed: 0.002, floatAmp: 2.5 });
      scene.add(octa);

      // Dodecahedron (Green) - positioned away from center
      const dodecaGeo = new THREE.DodecahedronGeometry(1.8, 0);
      const dodecaMat = new THREE.MeshBasicMaterial({
        color: colors.green,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
      dodeca.position.set(20, 14, -12);
      shapes.push({ mesh: dodeca, rotSpeed: { x: 0.003, y: 0.003 }, floatSpeed: 0.0012, floatAmp: 2 });
      scene.add(dodeca);

      // Tetrahedron (Amber) - positioned away from center
      const tetraGeo = new THREE.TetrahedronGeometry(2, 0);
      const tetraMat = new THREE.MeshBasicMaterial({
        color: colors.amber,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const tetra = new THREE.Mesh(tetraGeo, tetraMat);
      tetra.position.set(8, 18, -18);
      shapes.push({ mesh: tetra, rotSpeed: { x: 0.005, y: 0.002 }, floatSpeed: 0.0018, floatAmp: 3 });
      scene.add(tetra);

      // Particle Star Field
      const particleCount = 500;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 20;

        const colorChoice = Math.random();
        if (colorChoice < 0.3) {
          particleColors[i * 3] = 1;
          particleColors[i * 3 + 1] = 0.8;
          particleColors[i * 3 + 2] = 0;
        } else if (colorChoice < 0.5) {
          particleColors[i * 3] = 0.84;
          particleColors[i * 3 + 1] = 0;
          particleColors[i * 3 + 2] = 0.2;
        } else {
          particleColors[i * 3] = 1;
          particleColors[i * 3 + 1] = 1;
          particleColors[i * 3 + 2] = 1;
        }
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      document.addEventListener('mousemove', handleMouseMove);

      // Scroll interaction
      let scrollY = 0;
      const handleScroll = () => {
        scrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleScroll);

      // Animation
      let time = 0;
      let animationId: number;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.01;

        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        shapes.forEach((shape, i) => {
          shape.mesh.rotation.x += shape.rotSpeed.x;
          shape.mesh.rotation.y += shape.rotSpeed.y;
          shape.mesh.position.y += Math.sin(time * shape.floatSpeed * 100 + i) * 0.02;
        });

        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;

        camera.position.x += (targetX * 3 - camera.position.x) * 0.05;
        camera.position.y += (targetY * 2 - camera.position.y) * 0.05;

        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
        camera.position.z = 30 + scrollProgress * 10;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        renderer.dispose();
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, backgroundColor: '#0f172a' }}
    />
  );
}
