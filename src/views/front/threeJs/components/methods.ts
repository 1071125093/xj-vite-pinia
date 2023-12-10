import * as THREE from 'three'

// 创建场景
export const createScene = () => {
  const scene = new THREE.Scene()
  return scene
}

// 创建相机
export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  return camera
}

export const createRenderer = (theNoobRef: Ref<HTMLElement>) => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 干，nmd渲染到dom那里 被我的vue外壳挡住了。
  theNoobRef.value.appendChild(renderer.domElement)
  return renderer
}

export const createGeometry = (scene: THREE.Scene) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: '#87ceeb'
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  return { geometry, material, cube }
}

export const useThreeInit = (theNoobRef: Ref<HTMLElement>) => {
  // 创建场景
  const scene = createScene()

  // 创建相机
  const camera = createCamera()

  // 创建渲染器
  const renderer = createRenderer(theNoobRef)
  // 创建几何体
  const { cube } = createGeometry(scene)

  camera.position.z = 5
  camera.lookAt(0, 0, 0)
  renderer.render(scene, camera)

  // theNoobRef.value.appendChild(renderer.domElement)

  animate()
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
}
