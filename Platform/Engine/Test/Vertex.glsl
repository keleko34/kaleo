#version 300 es

in vec3 position;

void main() {
  gl_Position = vec4(position, 1.0);
  gl_PointSize = 50.0;
}