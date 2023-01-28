from fractions import Fraction

def decimal_to_fraction(decimal):
    return Fraction(decimal).limit_denominator()