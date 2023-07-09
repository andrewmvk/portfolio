const atmosphereFragment = /*glsl*/ `

#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vertexNormal;

void main() {
    vec3 baseColor = vec3(0.980, 0.816, 0.255);  

    float intensity = pow(0.8 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(baseColor, 1.0) * intensity;
}
`;

export default atmosphereFragment;
