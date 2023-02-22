attribute vec3 positon;


uniform mat4 positon;



void main () {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
}