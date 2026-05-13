export const key = (id, name) => id ? String(id) : 'x_' + name.replace(/\W+/g, '_');

export const P = [
  {s:"Introductory Problems",t:"intro",c:"#58a6ff",p:[
    [1068,"Weird Algorithm"],[1083,"Missing Number"],[1069,"Repetitions"],
    [1094,"Increasing Array"],[1070,"Permutations"],[1071,"Number Spiral"],
    [1072,"Two Knights"],[1092,"Two Sets"],[1617,"Bit Strings"],[1618,"Trailing Zeros"],
    [1754,"Coin Piles"],[1755,"Palindrome Reorder"],[2205,"Gray Code"],[2165,"Tower of Hanoi"],
    [1622,"Creating Strings"],[1623,"Apple Division"],[1624,"Chessboard and Queens"],
    [null,"Raab Game I"],[null,"Mex Grid Construction"],[null,"Knight Moves Grid"],
    [null,"Grid Coloring I"],[2431,"Digit Queries"],[1743,"String Reorder"],[1625,"Grid Paths"]
  ]},
  {s:"Sorting and Searching",t:"sort",c:"#bc8cff",p:[
    [1621,"Distinct Numbers"],[1084,"Apartments"],[1090,"Ferris Wheel"],[1091,"Concert Tickets"],
    [1619,"Restaurant Customers"],[1629,"Movie Festival"],[1640,"Sum of Two Values"],
    [1643,"Maximum Subarray Sum"],[1074,"Stick Lengths"],[2183,"Missing Coin Sum"],
    [2216,"Collecting Numbers"],[2217,"Collecting Numbers II"],[1141,"Playlist"],
    [1073,"Towers"],[1163,"Traffic Lights"],[2162,"Josephus Problem I"],
    [2163,"Josephus Problem II"],[2168,"Nested Ranges Check"],[2169,"Nested Ranges Count"],
    [1164,"Room Allocation"],[1620,"Factory Machines"],[1630,"Tasks and Deadlines"],
    [1631,"Reading Books"],[1641,"Sum of Three Values"],[1642,"Sum of Four Values"],
    [1645,"Nearest Smaller Values"],[1660,"Subarray Sums I"],[1661,"Subarray Sums II"],
    [1662,"Subarray Divisibility"],[2428,"Subarray Distinct Values"],[1085,"Array Division"],
    [1632,"Movie Festival II"],[1644,"Maximum Subarray Sum II"],
    [null,"New Sorting Problem A"],[null,"New Sorting Problem B"]
  ]},
  {s:"Dynamic Programming",t:"dp",c:"#3fb950",p:[
    [1633,"Dice Combinations"],[1634,"Minimizing Coins"],[1635,"Coin Combinations I"],
    [1636,"Coin Combinations II"],[1637,"Removing Digits"],[1638,"Grid Paths"],
    [1158,"Book Shop"],[1746,"Array Description"],[2413,"Counting Towers"],
    [1639,"Edit Distance"],[1744,"Rectangle Cutting"],[1745,"Money Sums"],
    [1097,"Removal Game"],[1093,"Two Sets II"],[1145,"Increasing Subsequence"],
    [1140,"Projects"],[1653,"Elevator Rides"],[2181,"Counting Tilings"],
    [2220,"Counting Numbers"],[null,"New DP Problem A"],[null,"New DP Problem B"],
    [null,"New DP Problem C"],[null,"New DP Problem D"]
  ]},
  {s:"Graph Algorithms",t:"graph",c:"#f0883e",p:[
    [1192,"Counting Rooms"],[1193,"Labyrinth"],[1666,"Building Roads"],[1667,"Message Route"],
    [1668,"Building Teams"],[1669,"Round Trip"],[1194,"Monsters"],[1671,"Shortest Routes I"],
    [1672,"Shortest Routes II"],[1673,"High Score"],[1195,"Flight Discount"],
    [1197,"Cycle Finding"],[1196,"Flight Routes"],[1678,"Round Trip II"],
    [1679,"Course Schedule"],[1680,"Longest Flight Route"],[1681,"Game Routes"],
    [1202,"Investigation"],[1750,"Planets Queries I"],[1160,"Planets Queries II"],
    [1751,"Planets Cycles"],[1675,"Road Reparation"],[1676,"Road Construction"],
    [1682,"Flight Routes Check"],[1683,"Planets and Kingdoms"],[1684,"Giant Pizza"],
    [1686,"Coin Collector"],[1691,"Mail Delivery"],[1692,"De Bruijn Sequence"],
    [1693,"Teleporters Path"],[1690,"Hamiltonian Flights"],[1689,"Knight's Tour"],
    [1694,"Download Speed"],[1695,"Police Chase"],[1696,"School Dance"],[1711,"Distinct Routes"]
  ]},
  {s:"Range Queries",t:"range",c:"#d29922",p:[
    [1646,"Static Range Sum Queries"],[1647,"Static Range Minimum Queries"],
    [1648,"Dynamic Range Sum Queries"],[1649,"Dynamic Range Minimum Queries"],
    [1650,"Range Xor Queries"],[1651,"Range Update Queries"],[1652,"Forest Queries"],
    [1143,"Hotel Queries"],[1749,"List Removals"],[1144,"Salary Queries"],
    [2166,"Prefix Sum Queries"],[2206,"Pizzeria Queries"],[1190,"Subarray Sum Queries"],
    [1734,"Distinct Values Queries"],[2416,"Increasing Array Queries"],[1739,"Forest Queries II"],
    [1735,"Range Updates and Sums"],[1736,"Polynomial Queries"],[1737,"Range Queries and Copies"],
    [null,"New Range Problem A"],[null,"New Range Problem B"],[null,"New Range Problem C"],
    [null,"New Range Problem D"],[null,"New Range Problem E"],[null,"New Range Problem F"]
  ]},
  {s:"Tree Algorithms",t:"tree",c:"#56d364",p:[
    [1674,"Subordinates"],[1130,"Tree Matching"],[1131,"Tree Diameter"],
    [1132,"Tree Distances I"],[1133,"Tree Distances II"],[1687,"Company Queries I"],
    [1688,"Company Queries II"],[1135,"Distance Queries"],[1136,"Counting Paths"],
    [1137,"Subtree Queries"],[1138,"Path Queries"],[2134,"Path Queries II"],
    [1139,"Distinct Colors"],[2079,"Finding a Centroid"],[2080,"Fixed-Length Paths I"],
    [2081,"Fixed-Length Paths II"]
  ]},
  {s:"Mathematics",t:"math",c:"#ff7b72",p:[
    [2164,"Josephus Queries"],[1095,"Exponentiation"],[1712,"Exponentiation II"],
    [1713,"Counting Divisors"],[1081,"Common Divisors"],[1082,"Sum of Divisors"],
    [2182,"Divisor Analysis"],[2185,"Prime Multiples"],[2417,"Counting Coprime Pairs"],
    [1079,"Binomial Coefficients"],[1715,"Creating Strings II"],[1716,"Distributing Apples"],
    [1717,"Christmas Party"],[2064,"Bracket Sequences I"],[2187,"Bracket Sequences II"],
    [2209,"Counting Necklaces"],[2210,"Counting Grids"],[1722,"Fibonacci Numbers"],
    [1096,"Throwing Dice"],[1723,"Graph Paths I"],[1724,"Graph Paths II"],
    [1725,"Dice Probability"],[1726,"Moving Robots"],[1727,"Candy Lottery"],
    [1728,"Inversion Probability"],[1729,"Stick Game"],[1730,"Nim Game I"],
    [1098,"Nim Game II"],[1099,"Stair Game"],[2207,"Grundy's Game"],[2208,"Another Game"],
    [null,"New Math Problem A"],[null,"New Math Problem B"],[null,"New Math Problem C"],
    [null,"New Math Problem D"],[null,"New Math Problem E"],[null,"New Math Problem F"]
  ]},
  {s:"String Algorithms",t:"strings",c:"#79c0ff",p:[
    [1731,"Word Combinations"],[1753,"String Matching"],[1732,"Finding Borders"],
    [1733,"Finding Periods"],[1110,"Minimal Rotation"],[1111,"Longest Palindrome"],
    [1112,"Required Substring"],[2420,"Palindrome Queries"],[2102,"Finding Patterns"],
    [2103,"Counting Patterns"],[2104,"Pattern Positions"],[2105,"Distinct Substrings"],
    [2106,"Repeating Substring"],[2107,"String Functions"],[2108,"Substring Order I"],
    [2109,"Substring Order II"],[2110,"Substring Distribution"],
    [null,"New String Problem A"],[null,"New String Problem B"],
    [null,"New String Problem C"],[null,"New String Problem D"]
  ]},
  {s:"Geometry",t:"geo",c:"#e3b341",p:[
    [2189,"Point Location Test"],[2190,"Line Segment Intersection"],[2191,"Polygon Area"],
    [2192,"Point in Polygon"],[2193,"Polygon Lattice Points"],[2194,"Minimum Euclidean Distance"],
    [2195,"Convex Hull"],
    [null,"New Geometry Problem A"],[null,"New Geometry Problem B"],
    [null,"New Geometry Problem C"],[null,"New Geometry Problem D"],
    [null,"New Geometry Problem E"],[null,"New Geometry Problem F"],
    [null,"New Geometry Problem G"],[null,"New Geometry Problem H"],
    [null,"New Geometry Problem I"]
  ]},
  {s:"Advanced Techniques",t:"adv",c:"#d2a8ff",p:[
    [1628,"Meet in the Middle"],[2136,"Hamming Distance"],[2137,"Beautiful Subgrids"],
    [2138,"Reachable Nodes"],[2143,"Reachability Queries"],[2072,"Cut and Paste"],
    [2073,"Substring Reversals"],[2074,"Reversals and Sums"],[2076,"Necessary Roads"],
    [2077,"Necessary Cities"],[2078,"Eulerian Subgraphs"],[2084,"Monster Game I"],
    [2085,"Monster Game II"],[2086,"Subarray Squares"],[2087,"Houses and Schools"],
    [2088,"Knuth Division"],[2111,"Apples and Bananas"],[2112,"One Bit Positions"],
    [2113,"Signal Processing"],[2101,"New Roads Queries"],[2133,"Dynamic Connectivity"],
    [2121,"Parcel Delivery"],[2129,"Task Assignment"],[2130,"Distinct Routes II"],
    [null,"New Advanced Techniques Problem"]
  ]},
  {s:"Sliding Window Problems",t:"slide",c:"#39d353",p:[
    [3220,"Sliding Window Sum"],[3221,"Sliding Window Minimum"],[3426,"Sliding Window Xor"],
    [3405,"Sliding Window Or"],[3222,"Sliding Window Distinct Values"],
    [3224,"Sliding Window Mode"],[3219,"Sliding Window Mex"],
    [1076,"Sliding Window Median"],[1077,"Sliding Window Cost"],
    [3223,"Sliding Window Inversions"],[3227,"Sliding Window Advertisement"]
  ]},
  {s:"Interactive Problems",t:"interact",c:"#58a6ff",p:[
    [3112,"Hidden Integer"],[3139,"Hidden Permutation"],[3305,"K-th Highest Score"],
    [3228,"Permuted Binary Strings"],[null,"Colored Chairs"],[3140,"Inversion Sorting"]
  ]},
  {s:"Bitwise Operations",t:"bits",c:"#ffa657",p:[
    [1146,"Counting Bits"],[1655,"Maximum Xor Subarray"],[null,"Maximum Xor Subset"],
    [null,"Number of Subset Xors"],[null,"K Subset Xors"],[null,"All Subarray Xors"],
    [null,"Xor Pyramid Peak"],[null,"Xor Pyramid Diagonal"],[null,"Xor Pyramid Row"],
    [null,"SOS Bit Problem"],[null,"And Subset Count"]
  ]},
  {s:"Construction Problems",t:"construct",c:"#ff6e6e",p:[
    [2214,"Inverse Inversions"],[2215,"Monotone Subsequences"],[null,"Third Permutation"],
    [null,"Permutation Prime Sums"],[1697,"Chess Tournament"],
    [null,"Distinct Sums Grid"],[2423,"Filling Trominos"],[2418,"Grid Path Construction"]
  ]},
  {s:"Advanced Graph Problems",t:"advgraph",c:"#85e89d",p:[
    [null,"Nearest Shops"],[1134,"Prüfer Code"],[1702,"Tree Traversals"],
    [1757,"Course Schedule II"],[1756,"Acyclic Graph Edges"],[2177,"Strongly Connected Edges"],
    [2179,"Even Outdegree Edges"],[1707,"Graph Girth"],[null,"Fixed Length Walk Queries"],
    [null,"Transfer Speeds Sum"],[null,"MST Edge Check"],[null,"MST Edge Set Check"],
    [null,"MST Edge Cost"],[1677,"Network Breakdown"],[null,"Tree Coin Collecting I"],
    [null,"Tree Coin Collecting II"],[1700,"Tree Isomorphism I"],[1701,"Tree Isomorphism II"],
    [1699,"Flight Route Requests"],[1703,"Critical Cities"],[1203,"Visiting Cities"],
    [null,"Graph Coloring"],[null,"Bus Companies"],[null,"Split into Two Paths"],
    [1704,"Network Renovation"],[1705,"Forbidden Cities"],[1752,"Creating Offices"],
    [1685,"New Flight Routes"]
  ]},
  {s:"Counting Problems",t:"count",c:"#c9d1d9",p:[
    [null,"Filled Subgrid Count I"],[null,"Filled Subgrid Count II"],
    [null,"All Letter Subgrid Count I"],[null,"All Letter Subgrid Count II"],
    [null,"Border Subgrid Count I"],[null,"Border Subgrid Count II"],
    [null,"Raab Game II"],[1080,"Empty String"],[2229,"Permutation Inversions"],
    [2176,"Counting Bishops"],[2228,"Counting Sequences"],[null,"Grid Paths II"],
    [null,"Counting Permutations"],[2429,"Grid Completion"],[2421,"Counting Reorders"],
    [null,"Tournament Graph Distribution"],[null,"Collecting Numbers Distribution"],
    [2415,"Functional Graph Distribution"]
  ]},
  {s:"Additional Problems I",t:"extra1",c:"#8b949e",p:[
    [1087,"Shortest Subsequence"],[null,"Distinct Values Sum"],[null,"Distinct Values Splits"],
    [1670,"Swap Game"],[null,"Beautiful Permutation II"],[2422,"Multiplication Table"],
    [null,"Bubble Sort Rounds I"],[null,"Bubble Sort Rounds II"],
    [null,"Nearest Campsites I"],[null,"Nearest Campsites II"],
    [1142,"Advertisement"],[2186,"Special Substrings"],
    [null,"Counting LCM Arrays"],[null,"Square Subsets"],[null,"Subarray Sum Constraints"],
    [null,"Water Containers Moves"],[null,"Permutation Subsequence"],
    [1188,"Bit Inversions"],[1086,"Writing Numbers"],[2427,"Letter Pair Move Game"],
    [1147,"Maximum Building I"],[1162,"Sorting Methods"],[1191,"Cyclic Array"],
    [2414,"List of Sums"],[2184,"Missing Coin Sum Queries"],[1157,"Number Grid"],
    [1664,"Movie Festival Queries"],[null,"New Additional I Problem A"],
    [null,"New Additional I Problem B"],[null,"New Additional I Problem C"]
  ]},
  {s:"Additional Problems II",t:"extra2",c:"#6e7681",p:[
    [null,"Bouncing Ball Steps"],[null,"Bouncing Ball Cycle"],[null,"Knight Moves Queries"],
    [null,"K Subset Sums I"],[null,"K Subset Sums II"],[2132,"Increasing Array II"],
    [1189,"Food Division"],[1698,"Swap Round Sorting"],[2430,"Binary Subsequences"],
    [1706,"School Excursion"],[1709,"Coin Grid"],[null,"Grid Coloring II"],
    [2426,"Programmers and Artists"],[2174,"Removing Digits II"],[2180,"Coin Arrangement"],
    [null,"Replace with Difference"],[2432,"Grid Puzzle I"],[2131,"Grid Puzzle II"],
    [2115,"Bit Substrings"],[2075,"Reversal Sorting"],[1159,"Book Shop II"],
    [null,"GCD Subsets"],[null,"Minimum Cost Pairs"],[null,"Same Sum Subsets"],
    [null,"Mex Grid Queries"],[1148,"Maximum Building II"],[1161,"Stick Divisions"],
    [null,"Stick Difference"],[1665,"Coding Company"],[2402,"Two Stacks Sorting"]
  ]}
];
