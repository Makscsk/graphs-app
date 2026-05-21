export const nameTranslations = {
  // 'Alluvial Diagram': 'Аллювиальная',
  // 'Arc Diagram': 'Дуговая',
  // 'Bar chart': 'Столбчатая',
  // 'Multi-set bar chart': 'Множественная столб.',
  // 'Stacked bar chart': 'Стековая столб.',
  // 'Beeswarm plot': 'Диаграмма-улей',
  // 'Box plot': 'Ящик с усами',
  // 'Bubble chart': 'Пузырьковая',
  // Bumpchart: 'Бампа',
  // 'Calendar heatmap': 'Календарная тепловая',
  // 'Chord Diagram': 'Хордовая',
  // 'Circle Packing': 'Упаковка кругов',
  // 'Circular dendrogram': 'Круговая дендрограмма',
  // 'Contour plot': 'Контурный график',
  // 'Convex hull': 'Выпуклая оболочка',
  // 'Linear dendrogram': 'Линейная дендрограмма',
  // 'Gantt chart': 'Ганта',
  // 'Hexagonal binning': 'Шестиугольное биннин.',
  // 'Horizon graph': 'Горизонтальный график',
  // 'Line chart': 'Линейная',
  // 'Matrix Plot': 'Матричный график',
  // 'Parallel coordinates': 'Параллельные коорд.',
  // 'Pie chart': 'Круговая',
  // 'Radar Chart': 'Лепестковая',
  // 'Sankey Diagram': 'Санки',
  // 'Slope chart': 'Наклонная',
  // 'Streamgraph (area chart)': 'Потоковый график',
  // 'Sunburst diagram': 'Солнечная',
  // Treemap: 'Древовидная карта',
  // 'Violin plot': 'Скрипичная',
  // 'Voronoi Diagram': 'Вороного',
  // 'Treemap (Voronoi)': 'Древовидная Вороного',
}

export const categoryTranslations = {
  Correlations: 'Корреляции',
  correlations: 'корреляции',
  Networks: 'Сети',
  networks: 'сети',
  Distributions: 'Распределения',
  distributions: 'распределения',
  'time series': 'Временные ряды',
  Hierarchies: 'Иерархии',
  hierarchies: 'иерархии',
  'Time chunks': 'Временные отрезки',
  'time chunks': 'временные отрезки',
  Proportions: 'Доли',
  proportions: 'доли',
}

export const descriptionTranslations = {
  'It shows correlations between categorical dimensions representing them as flows, visually linking categories with shared items. Each rectangle represents a unique value in the selected dimension, its height is proportional to its value. Correlations are represented with curved lines whose width is proportional to their value.':
    'Показывает взаимосвязи между категориальными измерениями в виде потоков, визуально связывая категории с общими элементами. Каждый прямоугольник представляет уникальное значение выбранного измерения, его высота пропорциональна значению. Связи отображаются изогнутыми линиями, толщина которых пропорциональна их величине.',
  'A particular kind of network graph, allows seeing relationships among nodes. Nodes are displayed on the horizontal axis, and links as clockwise arcs. An arc above the nodes means a connection from the left to the right, while below means a connection from the right node to the left one.':
    'Особый вид сетевого графа, позволяющий видеть связи между узлами. Узлы располагаются на горизонтальной оси, а связи — в виде дуг по часовой стрелке. Дуга над узлами означает связь слева направо, а под узлами — справа налево.',
  'It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.':
    'Отображает категориальное измерение и связанные величины. Каждый столбец представляет категорию, его высота пропорциональна количественному измерению.',
  'It displays multiple quantitative dimensions related to categories. bars are visually grouped in sets according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.':
    'Показывает несколько количественных измерений, связанных с категориями. Столбцы визуально сгруппированы по категориальному измерению, каждый столбец представляет количественное измерение и отображается своей высотой.',
  'It displays multiple quantitative dimensions related to categories. bars are visually stacked according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.':
    'Показывает несколько количественных измерений, связанных с категориями. Столбцы визуально stacked (сложены) согласно категориальному измерению, каждый представляет количественное измерение и отображается высотой.',
  'It displays the distribution of items over a continuous dimensions. Each (line) is represented with a dot placed on the horizontal axis. The vertical dimension is used to avoid overlaps among circles, showing their distribution. The area of dots can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.':
    'Показывает распределение элементов вдоль непрерывного измерения. Каждый элемент представлен точкой на горизонтальной оси. Вертикальное измерение используется для избежания наложений, показывая распределение. Площадь точек может кодировать дополнительное количественное измерение, а цвет — количественное или категориальное измерение.',
  'It summarize a quantitative distribution with five standard statistics: the smallest value, lower quartile, median, upper quartile, and largest value.':
    'Обобщает количественное распределение пятью стандартными статистиками: минимальное значение, нижний квартиль, медиана, верхний квартиль и максимальное значение.',
  'The basic layout is a scatter plot, which allows to see correlations among two continuous dimensions. A further quantitative dimension with size and a quantitative or categorical dimension with color.':
    'Базовая компоновка — точечный график, позволяющий увидеть взаимосвязи между двумя непрерывными измерениями. Дополнительное количественное измерение можно закодировать размером, а количественное или категориальное — цветом.',
  'It allows the comparison of multiple categories over a continuous dimension and the evolution of its sorting. By default, sorting is based on the stream size.':
    'Позволяет сравнивать несколько категорий вдоль непрерывного измерения и отслеживать изменение их ранжирования. По умолчанию сортировка зависит от размера потока.',
  'It visualise data through variations in colouring of a grid. The grid is composed by squares which represent a day in a calendar layout.':
    'Визуализирует данные за счёт изменения цвета ячеек сетки. Сетка состоит из квадратов, каждый из которых представляет день в календарной раскладке.',
  'It shows relationships among nodes. Nodes size represent the sum of incoming and outgoing links. Relationships are drawn as arcs whose width represent their values.':
    'Показывает связи между узлами. Размер узла отображает сумму входящих и исходящих связей. Связи рисуются в виде дуг, толщина которых соответствует их значениям.',
  'It displays values of leaf nodes of a hierarchical structure by using circles areas. The hierarchical structure is depicted using nested circles. A further quantitative dimension with size and a quantitative or categorical dimension with color.':
    'Отображает значения конечных узлов иерархической структуры с помощью площадей кругов. Иерархия показывается вложенными кругами. Дополнительное количественное измерение можно передать размером, а количественное или категориальное — цветом.',
  'It displays hierarchically structured data with a radial tree structure, where the root node is in the center with the hierarchies moving outward. The area of nodes can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.':
    'Отображает иерархические данные в виде радиального дерева, где корневой узел находится в центре, а уровни расходятся наружу. Площадь узлов может кодировать дополнительное количественное измерение, а цвет — количественное или категориальное.',
  'It shows the estimated density of point clouds, which is especially useful to avoid overplotting in large datasets.':
    'Показывает оценку плотности облака точек, что особенно полезно для предотвращения наложений в больших наборах данных.',
  'In mathematics, the convex hull is the smallest convex shape containing a set of points. Applied to a scatterplot, it is useful to identify points belonging to the same category.':
    'В математике выпуклая оболочка — это наименьшая выпуклая фигура, содержащая заданное множество точек. Применённая к точечному графику, она помогает выделить точки одной категории.',
  'It displays hierarchically structured data with a tree structure, where the root node is on the left and leaves are on the right. The size of nodes can be used to encode a further quantitative dimension with size and a quantitative or categorical dimension with color.':
    'Отображает иерархические данные в виде дерева, где корень находится слева, а листья — справа. Размер узлов может кодировать дополнительное количественное измерение, а цвет — количественное или категориальное.',
  'A Gantt chart is a type of bar chart, developed by Henry Gantt in the 1910s, that illustrates a project schedule. Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.':
    'Диаграмма Ганта — это разновидность столбчатой диаграммы, разработанная Генри Ганттом в 1910‑х годах, которая отображает расписание проекта. Показывает даты начала и окончания конечных и сводных элементов проекта.',
  'Hexagonal Binning is a way to manage the problem of having too many points that start to overlap. Hexagonal binning plots density, rather than points. Points are binned into gridded hexagons and distribution (the number of points per hexagon) is displayed using either the color or the area of the hexagons.':
    'Шестиугольное биннингование решает проблему наложения слишком большого количества точек. Вместо отдельных точек отображается плотность. Точки группируются в шестиугольные ячейки, а распределение (количество точек на шестиугольник) показывается цветом или площадью шестиугольников.',
  'It displays a quantitative dimension over a continuous interval or time period. Horizon graphs combine position and color to reduce vertical space.':
    'Отображает количественное измерение на непрерывном интервале или временном периоде. Горизонтальные графики сочетают положение и цвет для экономии вертикального пространства.',
  'It displays a quantitative dimension over a continuous interval or time period. Colour can be optionally used to encode an additional quantitative or categorical dimension.':
    'Показывает количественное измерение на непрерывном интервале или временном промежутке. Цвет опционально может кодировать дополнительное количественное или категориальное измерение.',
  'It allows comparison of two categorical dimensions, disposing them on the horizontal and vertical axes. Each glyph (square or circle) represents a possible correlation among the two dimensions. Associated quantitative variables can be represented with size and/or color.':
    'Позволяет сравнивать два категориальных измерения, располагая их на горизонтальной и вертикальной осях. Каждый значок (квадрат или круг) обозначает возможную взаимосвязь между измерениями. Связанные количественные переменные могут отображаться размером и/или цветом.',
  'It displays multiple continuous dimensions as axes, and each row in the dataset produces a line connecting its values across the axes.':
    'Отображает несколько непрерывных измерений в виде осей, и каждая строка данных даёт линию, соединяющую её значения на всех осях.',
  'It allows you to see the proportions between values that make up a whole, by using arcs composing a circle.':
    'Позволяет увидеть доли значений, составляющих целое, с помощью дуг, образующих круг.',
  'It displays multiple continuous dimensions as axes starting from the same point and by disposing them radially. Each dimension is represented as an axis starting from the center of the cart. The same scale is applied to all the axes.':
    'Отображает несколько непрерывных измерений в виде осей, расходящихся из одной точки по кругу. Каждое измерение представлено осью, начинающейся из центра графика. Для всех осей используется единая шкала.',
  'It represents flows among nodes of a network. Nodes are represented as rectangles, the height represents their value. Flows are represented with curved lines whose width is proportional to their value.':
    'Представляет потоки между узлами сети. Узлы показаны прямоугольниками, их высота соответствует значению. Потоки отображаются изогнутыми линиями, толщина которых пропорциональна величине потока.',
  'It allows the comparison of two continuous dimensions showing them as axes, and using a line to show the relationship.':
    'Позволяет сравнить два непрерывных измерения, представляя их в виде осей, а взаимосвязь показывается линией.',
  'It allows the comparison of multiple categories over a continuous dimension.':
    'Позволяет сравнивать несколько категорий вдоль непрерывного измерения.',
  'It displays hierarchically structured data and a related quantitative dimension using concentric circles. The circle in the center represents the root node, with the hierarchies moving outward from the center. The angle of each arc corresponds to the qualitative dimension.':
    'Отображает иерархические данные и связанное количественное измерение с помощью концентрических кругов. Центральный круг представляет корневой узел, а уровни иерархии расходятся наружу. Угол каждой дуги соответствует качественному измерению.',
  'It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.':
    'Отображает иерархические данные и связанное количественное измерение. Состоит из области, разделённой на маленькие прямоугольники, которые представляют последний уровень древовидной структуры. Размер прямоугольников зависит от количественного измерения.',
  'It is useful to show the distribution of a numeric dimension. The shape width represents the amount of items with the same value in the dataset.':
    'Полезна для отображения распределения числового измерения. Ширина фигуры показывает количество элементов с одинаковым значением в наборе данных.',
  'It creates the minimum area around each point defined by two variables. When applied to a scatterplot, it is useful to show the distance between points.':
    'Создаёт минимальную область вокруг каждой точки, заданной двумя переменными. В применении к точечному графику помогает показать расстояния между точками.',
  'It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small cells, representing the last level of the tree structure, computed using the Voronoi tessellation. The cells’ size depends on the quantitative dimension. the dimensions are calculated iteratively, therefore area could be not fully representative of the mapped value.':
    'Отображает иерархические данные и связанное количественное измерение. Состоит из области, разделённой на маленькие ячейки, представляющие последний уровень структуры, вычисленной с помощью мозаики Вороного. Размер ячеек зависит от количественного измерения. Размеры вычисляются итеративно, поэтому площадь может не полностью отражать сопоставленное значение.',
}

export function translateChartMetadata(chart) {
  if (!chart) return chart
  const newMetadata = { ...chart.metadata }
  if (nameTranslations[newMetadata.name]) {
    newMetadata.name = nameTranslations[newMetadata.name]
  }
  if (
    newMetadata.description &&
    descriptionTranslations[newMetadata.description]
  ) {
    newMetadata.description = descriptionTranslations[newMetadata.description]
  }
  if (newMetadata.category && categoryTranslations[newMetadata.category]) {
    newMetadata.category = categoryTranslations[newMetadata.category]
  }
  if (Array.isArray(newMetadata.categories)) {
    newMetadata.categories = newMetadata.categories.map(
      (cat) => categoryTranslations[cat] || cat
    )
  }
  return { ...chart, metadata: newMetadata }
}
