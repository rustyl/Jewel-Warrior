jewel.webgl = (function () {

    function createContext(canvas) {
        var gl = canvas.getContext("webgl") ||
                canvas.getContet("experimental-webgl");
        return gl;
    }

    function createShaderObject(gl, shaderType, source) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(shader);
        }
        return shader;
    }

    return {
        createShaderObject: createShaderObject,
        createContext: createContext
    };
}) ();