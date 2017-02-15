var requireTest = require.context('.', true, /_test\.js$/);
requireTest.keys().forEach(requireTest);
