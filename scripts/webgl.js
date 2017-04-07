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

    function createProgramObject(gl, vs, fs) {
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(program);
        }
        return program;
    }

    function createFloatBuffer(gl, data) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(data), gl.STATIC_DRAW
        );
        return buffer;
    }

    return {
        createFloatBuffer: createFloatBuffer,
        createProgramObject: createProgramObject,
        createShaderObject: createShaderObject,
        createContext: createContext
    };
}) ();