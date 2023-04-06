attribute vec3 vertexColor;
uniform float amplitude;


varying vec4 varColor;

void main()
{
    varColor = vec4(vertexColor, 1.0);

    vec4 pos = vec4(position, 1.0);
    pos.z *= amplitude;

    vec4 mvPosition = modelViewMatrix * pos;

    gl_PointSize = 1.0;
    gl_Position = projectionMatrix * mvPosition;
}


