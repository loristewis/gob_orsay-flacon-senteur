uniform float uTime;
uniform float uRatio;
uniform vec2 uMouse;

varying vec2 vUv;

void main () {
  float greenVal;

   vec2 uv = vUv;
    uv = -1. + 2. * uv;
    uv -= uMouse;
    uv.x *= uRatio;
    
    if ( length(uv) > 0.25 ) {
      greenVal = 1.0;
    }  else {
      greenVal = 0.0;
    }

  gl_FragColor = vec4(greenVal, 1., 1.0, 1.0); 
}