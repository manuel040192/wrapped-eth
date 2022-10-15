const WETH9 = require("../WETH9.json")
const { expect } = require('chai')

describe('WETH', () => {
    beforeEach(async () => {
        [owner, signer2] = await ethers.getSigners();
        provider = waffle.provider;

        Weth = new ethers.ContractFactory(WETH9.abi, WETH9.bytecode, owner)
        weth = await Weth.deploy();
    })

    describe('ETH', () => {
        it('wraps and unwraps ETH', async () => {
            const wethTime0 = await weth.connect(provider).balanceOf(signer2.address)
            expect(
                wethTime0
            ).to.be.equal(
                ethers.utils.parseEther('0')
            )
            
            await signer2.sendTransaction({
                to: weth.address,
                value: ethers.utils.parseEther('5')
            })

            const wethTime1 = await weth.connect(provider).balanceOf(signer2.address)
            expect(
                wethTime1
            ).to.be.equal(
                ethers.utils.parseEther('5')
            )

            await weth.connect(signer2).approve(
                weth.address,
                ethers.utils.parseEther('999999999')
            )

            await weth.connect(signer2).withdraw(
                ethers.utils.parseEther('2')
            )

            expect(
                await weth.connect(provider).balanceOf(signer2.address)
            ).to.be.equal(
                ethers.utils.parseEther('3')
            )
        })
    })
})