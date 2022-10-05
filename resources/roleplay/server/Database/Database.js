import * as sm from 'simplymongo';
new sm.Database('mongodb+srv://rayen:1234@cluster0.i00zm.mongodb.net/?retryWrites=true&w=majority', 'Omega', ['accounts','characters','vehicles']);