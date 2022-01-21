import * as sm from 'simplymongo';
new sm.Database('mongodb://127.0.0.1:27017', 'Omega', ['accounts','characters','vehicles']);
