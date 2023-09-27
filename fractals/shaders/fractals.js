const mandelbrot = `
precision highp float;

uniform int max_iter;
uniform float vertical_fov;
uniform vec2 resolution;
uniform vec2 center;

void main()
{
  vec3 color;
  
  // centered is the centered position vector in pixels
  vec2 centered = gl_FragCoord.xy - resolution/2.0;
  // plane_xy is the position vector in fractal space
  vec2 plane_xy = center + centered*vertical_fov/resolution.y;

  vec2 z = vec2(0.0, 0.0) + plane_xy;
  int iter = 0;
  for (; (iter <= max_iter) && (length(z) < 2.0); iter++) 
  {
    float newX = z.x*z.x - z.y*z.y + plane_xy.x;
    float newY = z.x*z.y*2.0 + plane_xy.y;
    z = vec2(newX, newY);
  }
  float val = max(1.0, float(iter))/float(max_iter);
  color = vec3(val, pow(val, 4.0), pow(val, val));
  gl_FragColor = vec4(color, 1.0);
}
`;

const julia = `
precision highp float;

uniform int max_iter;
uniform float vertical_fov;
uniform vec2 resolution;
uniform vec2 center;
uniform vec2 fc;

void main()
{
  vec3 color;
  
  // centered is the centered position vector in pixels
  vec2 centered = gl_FragCoord.xy - resolution/2.0;
  // plane_xy is the position vector in fractal space
  vec2 plane_xy = center + centered*vertical_fov/resolution.y;

  vec2 z = vec2(0.0, 0.0) + plane_xy;
  int iter = 0;
  for (; (iter <= max_iter) && (length(z) < 2.0); iter++) 
  {
    float newX = z.x*z.x - z.y*z.y + fc.x;
    float newY = z.x*z.y*2.0 + fc.y;
    z = vec2(newX, newY);
  }
  float val = max(1.0, float(iter))/float(max_iter);
  color = vec3(val, pow(val, 4.0), pow(val, val));
  gl_FragColor = vec4(color, 1.0);
}
`;