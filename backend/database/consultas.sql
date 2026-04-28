-- usuarios com mais produtos
SELECT
    u.id AS user_id, --na tabela a coluna id de users vira user_id
    u.name,
    u.email,
    COUNT(p.id) AS total_products --mostra quantidade de produtos por usuario dando nome de total_products
FROM users u
-- left join para trazer todos os usuarios mesmo aqueles que nao tem produtos
LEFT JOIN products p ON p.user_id = u.id
GROUP BY u.id, u.name, u.email
ORDER BY total_products DESC, u.id ASC; -- ordena primeiro usuarios com mais produtos

-- produto mais caro por usuario
SELECT
    u.id AS user_id,
    u.name AS user_name,
    u.email AS user_email,
    p.id AS product_id,
    p.name AS product_name,
    p.price
FROM users u
-- left join para trazer todos os usuarios com produtos
LEFT JOIN products p ON p.user_id = u.id
-- filtro de preço para pegar apenas o produto mais caro de cada usuario
    AND p.price = (
        SELECT MAX(p2.price)
        FROM products p2
        WHERE p2.user_id = u.id
    )
ORDER BY u.id;

-- quantidade de produtos por faixa de preco
SELECT
    CASE
        WHEN price < 50 THEN 'Ate R$ 49,99'
        WHEN price >= 50 AND price < 200 THEN 'R$ 50,00 a R$ 199,99'
        WHEN price >= 200 AND price < 1000 THEN 'R$ 200,00 a R$ 999,99'
        ELSE 'R$ 1.000,00 ou mais'
    END AS price_range, --fecha o case e da nome a coluna de price_range
    COUNT(*) AS total_products
FROM products
GROUP BY price_range
ORDER BY price_range; --ordena pela faixa de preço
